<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_fields
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
defined('_JEXEC') or die;

use Joomla\Registry\Registry;
use Joomla\Utilities\ArrayHelper;

/**
 * Fields Model
 *
 * @since  __DEPLOY_VERSION__
 */
class FieldsModelFields extends JModelList
{
	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @see     JModelLegacy
	 * @since   __DEPLOY_VERSION__
	 */
	public function __construct($config = array())
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
					'id',
					'a.id',
					'title',
					'a.title',
					'type',
					'a.type',
					'alias',
					'a.alias',
					'state',
					'a.state',
					'access',
					'a.access',
					'access_level',
					'language',
					'a.language',
					'ordering',
					'a.ordering',
					'checked_out',
					'a.checked_out',
					'checked_out_time',
					'a.checked_out_time',
					'created_time',
					'a.created_time',
					'created_user_id',
					'a.created_user_id',
					'category_title',
					'category_id',
					'a.category_id',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * This method should only be called once per instantiation and is designed
	 * to be called on the first call to the getState() method unless the model
	 * configuration flag to ignore the request is set.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   An optional ordering field.
	 * @param   string  $direction  An optional direction (asc|desc).
	 *
	 * @return  void
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function populateState($ordering = null, $direction = null)
	{
		$app     = JFactory::getApplication();
		$context = $this->context;

		$context = $app->getUserStateFromRequest('com_fields.fields.filter.context', 'context', 'com_content.article', 'cmd');

		$this->setState('filter.context', $context);
		$parts = explode('.', $context);

		// Extract the component name
		$this->setState('filter.component', $parts[0]);

		// Extract the optional section name
		$this->setState('filter.section', (count($parts) > 1) ? $parts[1] : null);

		$search = $this->getUserStateFromRequest($context . '.search', 'filter_search');
		$this->setState('filter.search', $search);

		$level = $this->getUserStateFromRequest($context . '.filter.level', 'filter_level');
		$this->setState('filter.level', $level);

		$access = $this->getUserStateFromRequest($context . '.filter.access', 'filter_access');
		$this->setState('filter.access', $access);

		$published = $this->getUserStateFromRequest($context . '.filter.published', 'filter_published', '');
		$this->setState('filter.published', $published);

		$categoryId = $this->getUserStateFromRequest($this->context . '.filter.category_id', 'filter_category_id');
		$this->setState('filter.category_id', $categoryId);

		$language = $this->getUserStateFromRequest($context . '.filter.language', 'filter_language', '');
		$this->setState('filter.language', $language);

		// List state information.
		parent::populateState('a.ordering', 'asc');

		// Force a language
		$forcedLanguage = $app->input->get('forcedLanguage');

		if (! empty($forcedLanguage))
		{
			$this->setState('filter.language', $forcedLanguage);
			$this->setState('filter.forcedLanguage', $forcedLanguage);
		}
	}

	/**
	 * Method to get a store id based on the model configuration state.
	 *
	 * This is necessary because the model is used by the component and
	 * different modules that might need different sets of data or different
	 * ordering requirements.
	 *
	 * @param   string  $id  An identifier string to generate the store id.
	 *
	 * @return  string  A store id.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getStoreId($id = '')
	{
		// Compile the store id.
		$id .= ':' . $this->getState('filter.search');
		$id .= ':' . $this->getState('filter.context');
		$id .= ':' . serialize($this->getState('filter.assigned_cat_ids'));
		$id .= ':' . $this->getState('filter.published');
		$id .= ':' . $this->getState('filter.category_id');
		$id .= ':' . print_r($this->getState('filter.language'), true);

		return parent::getStoreId($id);
	}

	/**
	 * Method to get a JDatabaseQuery object for retrieving the data set from a database.
	 *
	 * @return  JDatabaseQuery   A JDatabaseQuery object to retrieve the data set.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function getListQuery()
	{
		// Create a new query object.
		$db    = $this->getDbo();
		$query = $db->getQuery(true);
		$user  = JFactory::getUser();

		// Select the required fields from the table.
		$query->select($this->getState('list.select', 'a.*'));
		$query->from('#__fields AS a');

		// Join over the language
		$query->select('l.title AS language_title, l.image AS language_image')
			->join('LEFT', $db->quoteName('#__languages') . ' AS l ON l.lang_code = a.language');

		// Join over the users for the checked out user.
		$query->select('uc.name AS editor')->join('LEFT', '#__users AS uc ON uc.id=a.checked_out');

		// Join over the asset groups.
		$query->select('ag.title AS access_level')->join('LEFT', '#__viewlevels AS ag ON ag.id = a.access');

		// Join over the users for the author.
		$query->select('ua.name AS author_name')->join('LEFT', '#__users AS ua ON ua.id = a.created_user_id');

		// Join over the categories.
		$query->select('c.title as category_title, c.access, c.published')->join('LEFT', '#__categories AS c ON c.id = a.catid');

		// Filter by context
		if ($context = $this->getState('filter.context'))
		{
			$query->where('a.context = ' . $db->quote($context));
		}

		// Filter by access level.
		if ($access = $this->getState('filter.access'))
		{
			if (is_array($access))
			{
				$access = ArrayHelper::toInteger($access);
				$query->where('a.access in (' . implode(',', $access) . ')');
			}
			else
			{
				$query->where('a.access = ' . (int) $access);
			}
		}

		if (($categories = $this->getState('filter.assigned_cat_ids')) && $context)
		{
			$categories = (array) $categories;
			$condition = "a.assigned_cat_ids = '' or find_in_set(0, a.assigned_cat_ids) ";
			$parts = FieldsHelper::extract($context);

			if ($parts)
			{
				// Get the category
				$cat = JCategories::getInstance(str_replace('com_', '', $parts[0]));

				if ($cat)
				{
					foreach ($categories as $assignedCatIds)
					{
						// Check if we have the actual category
						$parent = $cat->get($assignedCatIds);

						if ($parent)
						{
							$condition .= 'or find_in_set(' . (int) $parent->id . ',a.assigned_cat_ids) ';

							// Traverse the tree up to get all the fields which
							// are attached to a parent
							while ($parent->getParent() && $parent->getParent()->id != 'root')
							{
								$parent = $parent->getParent();
								$condition .= 'or find_in_set(' . (int) $parent->id . ',a.assigned_cat_ids) ';
							}
						}
					}
				}
			}

			$query->where('(' . $condition . ')');
		}

		// Implement View Level Access
		if (!$user->authorise('core.admin'))
		{
			$groups = implode(',', $user->getAuthorisedViewLevels());
			$query->where('a.access IN (' . $groups . ') AND (c.id IS NULL OR c.access IN (' . $groups . '))');
		}

		// Filter by published state
		$published = $this->getState('filter.published');

		if (is_numeric($published))
		{
			$query->where('a.state = ' . (int) $published);

			if (JFactory::getApplication()->isSite())
			{
				$query->where('(c.id IS NULL OR c.published = ' . (int) $published . ')', 'AND');
			}
		}
		elseif ($published === '')
		{
			$query->where('a.state IN (0, 1)');

			if (JFactory::getApplication()->isSite())
			{
				$query->where('(c.id IS NULL OR c.published IN (0, 1)', 'AND');
			}
		}

		// Filter by a single or group of categories.
		$baselevel = 1;
		$categoryId = $this->getState('filter.category_id');

		if (is_numeric($categoryId))
		{
			$cat_tbl = JTable::getInstance('Category', 'JTable');
			$cat_tbl->load($categoryId);
			$rgt = $cat_tbl->rgt;
			$lft = $cat_tbl->lft;
			$baselevel = (int) $cat_tbl->level;
			$query->where('c.lft >= ' . (int) $lft)
				->where('c.rgt <= ' . (int) $rgt);
		}
		elseif (is_array($categoryId))
		{
			$categoryId = ArrayHelper::toInteger($categoryId);
			$categoryId = implode(',', $categoryId);
			$query->where('a.catid IN (' . $categoryId . ')');
		}

		// Filter by search in title
		$search = $this->getState('filter.search');

		if (! empty($search))
		{
			if (stripos($search, 'id:') === 0)
			{
				$query->where('a.id = ' . (int) substr($search, 3));
			}
			elseif (stripos($search, 'author:') === 0)
			{
				$search = $db->quote('%' . $db->escape(substr($search, 7), true) . '%');
				$query->where('(ua.name LIKE ' . $search . ' OR ua.username LIKE ' . $search . ')');
			}
			else
			{
				$search = $db->quote('%' . str_replace(' ', '%', $db->escape(trim($search), true) . '%'));
				$query->where('(a.title LIKE ' . $search . ' OR a.alias LIKE ' . $search . ' OR a.note LIKE ' . $search . ')');
			}
		}

		// Filter on the language.
		if ($language = $this->getState('filter.language'))
		{
			$language = (array) $language;

			foreach ($language as $key => $l)
			{
				$language[$key] = $db->quote($l);
			}

			$query->where('a.language in (' . implode(',', $language) . ')');
		}

		// Add the list ordering clause
		$listOrdering = $this->getState('list.ordering', 'a.ordering');
		$listDirn     = $db->escape($this->getState('list.direction', 'ASC'));

		if ($listOrdering == 'a.access')
		{
			$query->order('a.access ' . $listDirn);
		}
		else
		{
			$query->order($db->escape($listOrdering) . ' ' . $listDirn);
		}

		return $query;
	}

	/**
	 * Gets an array of objects from the results of database query.
	 *
	 * @param   string   $query       The query.
	 * @param   integer  $limitstart  Offset.
	 * @param   integer  $limit       The number of records.
	 *
	 * @return  array  An array of results.
	 *
	 * @since   __DEPLOY_VERSION__
	 * @throws  RuntimeException
	 */
	protected function _getList($query, $limitstart = 0, $limit = 0)
	{
		$result = parent::_getList($query, $limitstart, $limit);

		if (is_array($result))
		{
			foreach ($result as $field)
			{
				$field->fieldparams = new Registry($field->fieldparams);
				$field->params = new Registry($field->params);
			}
		}

		return $result;
	}

	/**
	 * Get the filter form
	 *
	 * @param   array    $data      data
	 * @param   boolean  $loadData  load current data
	 *
	 * @return  JForm/false  the JForm object or false
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getFilterForm($data = array(), $loadData = true)
	{
		$form = parent::getFilterForm($data, $loadData);

		if ($form)
		{
			$path = JPATH_ADMINISTRATOR . '/components/' . $this->getState('filter.component') . '/models/forms/filter_fields.xml';

			if (file_exists($path))
			{
				// Load all children that's why we need to define the xpath
				if (!$form->loadFile($path, true, '/form/*'))
				{
					throw new Exception(JText::_('JERROR_LOADFILE_FAILED'));
				}
			}

			$context = JFactory::getApplication()->input->getCmd('context');

			// If the context has multiple sections, this is the input field
			// to display them
			$form->setValue('section', 'custom', $context);

			$form->setFieldAttribute('category_id', 'extension', $context . '.fields', 'filter');
		}

		return $form;
	}
}
