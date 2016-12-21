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
use Joomla\String\StringHelper;
use Joomla\Utilities\ArrayHelper;

/**
 * Field Model
 *
 * @since  3.7.0
 */
class FieldsModelField extends JModelAdmin
{
	/**
	 * @var null|string
	 *
	 * @since   3.7.0
	 */
	public $typeAlias = null;

	/**
	 * @var string
	 *
	 * @since   3.7.0
	 */
	protected $text_prefix = 'COM_FIELDS';

	/**
	 * Batch copy/move command. If set to false,
	 * the batch copy/move command is not supported
	 *
	 * @var    string
	 * @since  3.4
	 */
	protected $batch_copymove = 'group_id';

	/**
	 * @var array
	 *
	 * @since   3.7.0
	 */
	private $valueCache = array();

	/**
	 * Constructor.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @see     JModelLegacy
	 * @since   3.7.0
	 */
	public function __construct($config = array())
	{
		parent::__construct($config);

		$this->typeAlias = JFactory::getApplication()->input->getCmd('context', 'com_content.article') . '.field';
	}

	/**
	 * Method to save the form data.
	 *
	 * @param   array  $data  The form data.
	 *
	 * @return  boolean  True on success, False on error.
	 *
	 * @since   3.7.0
	 */
	public function save($data)
	{
		$field = null;

		if (isset($data['id']) && $data['id'])
		{
			$field = $this->getItem($data['id']);
		}

		if (!isset($data['label']) && isset($data['params']['label']))
		{
			$data['label'] = $data['params']['label'];

			unset($data['params']['label']);
		}

		// Alter the title for save as copy
		$input = JFactory::getApplication()->input;

		if ($input->get('task') == 'save2copy')
		{
			$origTable = clone $this->getTable();
			$origTable->load($input->getInt('id'));

			if ($data['title'] == $origTable->title)
			{
				list($title, $alias) = $this->generateNewTitle($data['group_id'], $data['alias'], $data['title']);
				$data['title'] = $title;
				$data['label'] = $title;
				$data['alias'] = $alias;
			}
			else
			{
				if ($data['alias'] == $origTable->alias)
				{
					$data['alias'] = '';
				}
			}

			$data['state'] = 0;
		}

		if (!parent::save($data))
		{
			return false;
		}

		// Save the assigned categories into #__fields_categories
		$db = $this->getDbo();
		$id = (int) $this->getState('field.id');
		$cats = isset($data['assigned_cat_ids']) ? (array) $data['assigned_cat_ids'] : array();
		$cats = ArrayHelper::toInteger($cats);

		$assignedCatIds = array();

		foreach ($cats as $cat)
		{
			if ($cat)
			{
				$assignedCatIds[] = $cat;
			}
		}

		// First delete all assigned categories
		$query = $db->getQuery(true);
		$query->delete('#__fields_categories')
			->where('field_id = ' . $id);
		$db->setQuery($query);
		$db->execute();

		// Inset new assigned categories
		$tupel = new stdClass;
		$tupel->field_id = $id;

		foreach ($assignedCatIds as $catId)
		{
			$tupel->category_id = $catId;
			$db->insertObject('#__fields_categories', $tupel);
		}

		// If the options have changed delete the values
		if ($field && isset($data['fieldparams']['options']) && isset($field->fieldparams['options']))
		{
			$oldParams = json_decode($field->fieldparams['options']);
			$newParams = json_decode($data['fieldparams']['options']);

			if (is_object($oldParams) && is_object($newParams) && $oldParams->name != $newParams->name)
			{
				$query = $db->getQuery(true);
				$query->delete('#__fields_values')->where('field_id = ' . (int) $field->id)
					->where("value not in ('" . implode("','", $newParams->name) . "')");
				$db->setQuery($query);
				$db->execute();
			}
		}

		return true;
	}

	/**
	 * Method to get a single record.
	 *
	 * @param   integer  $pk  The id of the primary key.
	 *
	 * @return  mixed    Object on success, false on failure.
	 *
	 * @since   3.7.0
	 */
	public function getItem($pk = null)
	{
		$result = parent::getItem($pk);

		if ($result)
		{
			// Prime required properties.
			if (empty($result->id))
			{
				$result->context = JFactory::getApplication()->input->getCmd('context', $this->getState('field.context'));
			}

			if (property_exists($result, 'fieldparams'))
			{
				$registry = new Registry;
				$registry->loadString($result->fieldparams);
				$result->fieldparams = $registry->toArray();
			}

			$db = $this->getDbo();
			$query = $db->getQuery(true);
			$query->select('category_id')
				->from('#__fields_categories')
				->where('field_id = ' . (int) $result->id);

			$db->setQuery($query);
			$result->assigned_cat_ids = $db->loadColumn() ?: array(0);

			// Convert the created and modified dates to local user time for
			// display in the form.
			$tz = new DateTimeZone(JFactory::getApplication()->get('offset'));

			if ((int) $result->created_time)
			{
				$date = new JDate($result->created_time);
				$date->setTimezone($tz);

				$result->created_time = $date->toSql(true);
			}
			else
			{
				$result->created_time = null;
			}

			if ((int) $result->modified_time)
			{
				$date = new JDate($result->modified_time);
				$date->setTimezone($tz);

				$result->modified_time = $date->toSql(true);
			}
			else
			{
				$result->modified_time = null;
			}
		}

		return $result;
	}

	/**
	 * Method to get a table object, load it if necessary.
	 *
	 * @param   string  $name     The table name. Optional.
	 * @param   string  $prefix   The class prefix. Optional.
	 * @param   array   $options  Configuration array for model. Optional.
	 *
	 * @return  JTable  A JTable object
	 *
	 * @since   3.7.0
	 * @throws  Exception
	 */
	public function getTable($name = 'Field', $prefix = 'FieldsTable', $options = array())
	{
		if (strpos(JPATH_COMPONENT, 'com_fields') === false)
		{
			$this->addTablePath(JPATH_ADMINISTRATOR . '/components/com_fields/tables');
		}

		return JTable::getInstance($name, $prefix, $options);
	}

	/**
	 * Method to change the title & alias.
	 *
	 * @param   integer  $category_id  The id of the category.
	 * @param   string   $alias        The alias.
	 * @param   string   $title        The title.
	 *
	 * @return  array  Contains the modified title and alias.
	 *
	 * @since    3.7.0
	 */
	protected function generateNewTitle($category_id, $alias, $title)
	{
		// Alter the title & alias
		$table = $this->getTable();

		while ($table->load(array('alias' => $alias)))
		{
			$title = StringHelper::increment($title);
			$alias = StringHelper::increment($alias, 'dash');
		}

		return array(
			$title,
			$alias,
		);
	}

	/**
	 * Method to delete one or more records.
	 *
	 * @param   array  &$pks  An array of record primary keys.
	 *
	 * @return  boolean  True if successful, false if an error occurs.
	 *
	 * @since   3.7.0
	 */
	public function delete(&$pks)
	{
		$success = parent::delete($pks);

		if ($success)
		{
			$pks = (array) $pks;
			$pks = ArrayHelper::toInteger($pks);
			$pks = array_filter($pks);

			if (!empty($pks))
			{
				$query = $this->getDbo()->getQuery(true);

				$query->delete($query->qn('#__fields_values'))
					->where($query->qn('field_id') . ' IN(' . implode(',', $pks) . ')');

				$this->getDbo()->setQuery($query)->execute();
			}
		}

		return $success;
	}

	/**
	 * Abstract method for getting the form from the model.
	 *
	 * @param   array    $data      Data for the form.
	 * @param   boolean  $loadData  True if the form is to load its own data (default case), false if not.
	 *
	 * @return  mixed  A JForm object on success, false on failure
	 *
	 * @since   3.7.0
	 */
	public function getForm($data = array(), $loadData = true)
	{
		$context = $this->getState('field.context');
		$jinput  = JFactory::getApplication()->input;

		// A workaround to get the context into the model for save requests.
		if (empty($context) && isset($data['context']))
		{
			$context = $data['context'];
			$parts   = FieldsHelper::extract($context);

			$this->setState('field.context', $context);

			if ($parts)
			{
				$this->setState('field.component', $parts[0]);
				$this->setState('field.section', $parts[1]);
			}
		}

		// Get the form.
		$form = $this->loadForm(
			'com_fields.field' . $context, 'field',
			array(
				'control'   => 'jform',
				'load_data' => $loadData,
			)
		);

		if (empty($form))
		{
			return false;
		}

		// Modify the form based on Edit State access controls.
		if (empty($data['context']))
		{
			$data['context'] = $context;
		}

		if (isset($data['type']))
		{
			$this->loadTypeForms($form, $data['type']);
		}

		$fieldId  = $jinput->get('id');
		$assetKey = $this->state->get('field.component') . '.field.' . $fieldId;

		if (!JFactory::getUser()->authorise('core.edit.state', $assetKey))
		{
			// Disable fields for display.
			$form->setFieldAttribute('ordering', 'disabled', 'true');
			$form->setFieldAttribute('state', 'disabled', 'true');

			// Disable fields while saving. The controller has already verified this is a record you can edit.
			$form->setFieldAttribute('ordering', 'filter', 'unset');
			$form->setFieldAttribute('state', 'filter', 'unset');
		}

		return $form;
	}

	/**
	 * Load the form declaration for the type.
	 *
	 * @param   JForm   &$form  The form
	 * @param   string  $type   The type
	 *
	 * @return  void
	 *
	 * @since   3.7.0
	 */
	private function loadTypeForms(JForm &$form, $type)
	{
		FieldsHelperInternal::loadPlugins();

		$type = JFormHelper::loadFieldType($type);

		// Load all children that's why we need to define the xpath
		if (!($type instanceof JFormDomfieldinterface))
		{
			return;
		}

		$form->load($type->getFormParameters(), true, '/form/*');
	}

	/**
	 * Setting the value for the gven field id, context and item id.
	 *
	 * @param   string  $fieldId  The field ID.
	 * @param   string  $context  The context.
	 * @param   string  $itemId   The ID of the item.
	 * @param   string  $value    The value.
	 *
	 * @return  boolean
	 *
	 * @since   3.7.0
	 */
	public function setFieldValue($fieldId, $context, $itemId, $value)
	{
		$field  = $this->getItem($fieldId);
		$params = $field->params;

		if (is_array($params))
		{
			$params = new Registry($params);
		}

		// Don't save the value when the field is disabled or the user is
		// not authorized to change it
		if (!$field || $params->get('disabled', 0) || !FieldsHelperInternal::canEditFieldValue($field))
		{
			return false;
		}

		$needsDelete = false;
		$needsInsert = false;
		$needsUpdate = false;

		if ($field->default_value == $value)
		{
			$needsDelete = true;
		}
		else
		{
			$oldValue = $this->getFieldValue($fieldId, $context, $itemId);
			$value    = (array) $value;

			if ($oldValue === null)
			{
				// No records available, doing normal insert
				$needsInsert = true;
			}
			elseif (count($value) == 1 && count((array) $oldValue) == 1)
			{
				// Only a single row value update can be done
				$needsUpdate = true;
			}
			else
			{
				// Multiple values, we need to purge the data and do a new
				// insert
				$needsDelete = true;
				$needsInsert = true;
			}
		}

		if ($needsDelete)
		{
			// Deleting the existing record as it is a reset
			$query = $this->getDbo()->getQuery(true);

			$query->delete($query->qn('#__fields_values'))
				->where($query->qn('field_id') . ' = ' . (int) $fieldId)
				->where($query->qn('context') . ' = ' . $query->q($context))
				->where($query->qn('item_id') . ' = ' . $query->q($itemId));

			$this->getDbo()->setQuery($query)->execute();
		}

		if ($needsInsert)
		{
			$newObj = new stdClass;

			$newObj->field_id = (int) $fieldId;
			$newObj->context  = $context;
			$newObj->item_id  = $itemId;

			foreach ($value as $v)
			{
				$newObj->value = $v;

				$this->getDbo()->insertObject('#__fields_values', $newObj);
			}
		}

		if ($needsUpdate)
		{
			$updateObj = new stdClass;

			$updateObj->field_id = (int) $fieldId;
			$updateObj->context  = $context;
			$updateObj->item_id  = $itemId;
			$updateObj->value    = reset($value);

			$this->getDbo()->updateObject('#__fields_values', $updateObj, array('field_id', 'context', 'item_id'));
		}

		$this->valueCache = array();

		return true;
	}

	/**
	 * Returning the value for the given field id, context and item id.
	 *
	 * @param   string  $fieldId  The field ID.
	 * @param   string  $context  The context.
	 * @param   string  $itemId   The ID of the item.
	 *
	 * @return  NULL|string
	 *
	 * @since  3.7.0
	 */
	public function getFieldValue($fieldId, $context, $itemId)
	{
		$key = md5($fieldId . $context . $itemId);

		if (!key_exists($key, $this->valueCache))
		{
			$this->valueCache[$key] = null;

			$query = $this->getDbo()->getQuery(true);

			$query->select($query->qn('value'))
				->from($query->qn('#__fields_values'))
				->where($query->qn('field_id') . ' = ' . (int) $fieldId)
				->where($query->qn('context') . ' = ' . $query->q($context))
				->where($query->qn('item_id') . ' = ' . $query->q($itemId));

			$rows = $this->getDbo()->setQuery($query)->loadObjectList();

			if (count($rows) == 1)
			{
				$this->valueCache[$key] = array_shift($rows)->value;
			}
			elseif (count($rows) > 1)
			{
				$data = array();

				foreach ($rows as $row)
				{
					$data[] = $row->value;
				}

				$this->valueCache[$key] = $data;
			}
		}

		return $this->valueCache[$key];
	}

	/**
	 * Cleaning up the values for the given item on the context.
	 *
	 * @param   string  $context  The context.
	 * @param   string  $itemId   The Item ID.
	 *
	 * @return  void
	 *
	 * @since   3.7.0
	 */
	public function cleanupValues($context, $itemId)
	{
		$query = $this->getDbo()->getQuery(true);

		$query->delete($query->qn('#__fields_values'))
			->where($query->qn('context') . ' = ' . $query->q($context))
			->where($query->qn('item_id') . ' = ' . $query->q($itemId));

		$this->getDbo()->setQuery($query)->execute();
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param   object  $record  A record object.
	 *
	 * @return  boolean  True if allowed to delete the record. Defaults to the permission for the component.
	 *
	 * @since   3.7.0
	 */
	protected function canDelete($record)
	{
		if (!empty($record->id))
		{
			if ($record->state != -2)
			{
				return false;
			}

			$parts = FieldsHelper::extract($record->context);

			return JFactory::getUser()->authorise('core.delete', $parts[0] . '.field.' . (int) $record->id);
		}

		return false;
	}

	/**
	 * Method to test whether a record can be deleted.
	 *
	 * @param   object  $record  A record object.
	 *
	 * @return  boolean  True if allowed to change the state of the record. Defaults to the permission for the
	 *                   component.
	 *
	 * @since   3.7.0
	 */
	protected function canEditState($record)
	{
		$user  = JFactory::getUser();
		$parts = FieldsHelper::extract($record->context);

		// Check for existing field.
		if (!empty($record->id))
		{
			return $user->authorise('core.edit.state', $parts[0] . '.field.' . (int) $record->id);
		}

		return $user->authorise('core.edit.state', $parts[0]);
	}

	/**
	 * Stock method to auto-populate the model state.
	 *
	 * @return  void
	 *
	 * @since   3.7.0
	 */
	protected function populateState()
	{
		$app = JFactory::getApplication('administrator');

		// Load the User state.
		$pk = $app->input->getInt('id');
		$this->setState($this->getName() . '.id', $pk);

		$context = $app->input->get('context', 'com_content.article');
		$this->setState('field.context', $context);
		$parts = FieldsHelper::extract($context);

		// Extract the component name
		$this->setState('field.component', $parts[0]);

		// Extract the optional section name
		$this->setState('field.section', (count($parts) > 1) ? $parts[1] : null);

		// Load the parameters.
		$params = JComponentHelper::getParams('com_fields');
		$this->setState('params', $params);
	}

	/**
	 * A protected method to get a set of ordering conditions.
	 *
	 * @param   JTable  $table  A JTable object.
	 *
	 * @return  array  An array of conditions to add to ordering queries.
	 *
	 * @since   3.7.0
	 */
	protected function getReorderConditions($table)
	{
		return 'context = ' . $this->_db->quote($table->context);
	}

	/**
	 * Method to get the data that should be injected in the form.
	 *
	 * @return  array  The default data is an empty array.
	 *
	 * @since   3.7.0
	 */
	protected function loadFormData()
	{
		// Check the session for previously entered form data.
		$app  = JFactory::getApplication();
		$data = $app->getUserState('com_fields.edit.field.data', array());

		if (empty($data))
		{
			$data = $this->getItem();

			// Pre-select some filters (Status, Language, Access) in edit form
			// if those have been selected in Category Manager
			if (!$data->id)
			{
				// Check for which context the Category Manager is used and
				// get selected fields
				$context   = substr($app->getUserState('com_fields.fields.filter.context'), 4);
				$component = FieldsHelper::extract($context);
				$component = $component ? $component[0] : null;

				$filters = (array) $app->getUserState('com_fields.fields.' . $component . '.filter');

				$data->set('published', $app->input->getInt('published', (!empty($filters['published']) ? $filters['published'] : null)));
				$data->set('language', $app->input->getString('language', (!empty($filters['language']) ? $filters['language'] : null)));
				$data->set(
					'access',
					$app->input->getInt('access', (!empty($filters['access']) ? $filters['access'] : JFactory::getConfig()->get('access')))
				);

				// Set the type if available from the request
				$data->set('type', $app->input->getWord('type', $data->get('type')));
			}

			if ($data->label && !isset($data->params['label']))
			{
				$data->params['label'] = $data->label;
			}
		}

		$this->preprocessData('com_fields.field', $data);

		return $data;
	}

	/**
	 * Method to allow derived classes to preprocess the form.
	 *
	 * @param   JForm   $form   A JForm object.
	 * @param   mixed   $data   The data expected for the form.
	 * @param   string  $group  The name of the plugin group to import (defaults to "content").
	 *
	 * @return  void
	 *
	 * @see     JFormField
	 * @since   3.7.0
	 * @throws  Exception if there is an error in the form event.
	 */
	protected function preprocessForm(JForm $form, $data, $group = 'content')
	{
		$component  = $this->state->get('field.component');
		$dataObject = $data;

		if (is_array($dataObject))
		{
			$dataObject = (object) $dataObject;
		}

		if (isset($dataObject->type))
		{
			$this->loadTypeForms($form, $dataObject->type);

			$form->setFieldAttribute('type', 'component', $component);

			// Not allowed to change the type of an existing record
			if ($dataObject->id)
			{
				$form->setFieldAttribute('type', 'readonly', 'true');
			}
		}

		// Setting the context for the category field
		$cat = JCategories::getInstance(str_replace('com_', '', $component));

		if ($cat && $cat->get('root')->hasChildren())
		{
			$form->setFieldAttribute('assigned_cat_ids', 'extension', $component);
		}
		else
		{
			$form->removeField('assigned_cat_ids');
		}

		$form->setFieldAttribute('type', 'component', $component);
		$form->setFieldAttribute('group_id', 'context', $this->state->get('field.context'));
		$form->setFieldAttribute('rules', 'component', $component);

		// Trigger the default form events.
		parent::preprocessForm($form, $data, $group);
	}

	/**
	 * Clean the cache
	 *
	 * @param   string   $group      The cache group
	 * @param   integer  $client_id  The ID of the client
	 *
	 * @return  void
	 *
	 * @since   3.7.0
	 */
	protected function cleanCache($group = null, $client_id = 0)
	{
		$context = JFactory::getApplication()->input->get('context');

		switch ($context)
		{
			case 'com_content':
				parent::cleanCache('com_content');
				parent::cleanCache('mod_articles_archive');
				parent::cleanCache('mod_articles_categories');
				parent::cleanCache('mod_articles_category');
				parent::cleanCache('mod_articles_latest');
				parent::cleanCache('mod_articles_news');
				parent::cleanCache('mod_articles_popular');
				break;
			default:
				parent::cleanCache($context);
				break;
		}
	}

	/**
	 * Batch copy fields to a new group.
	 *
	 * @param   integer  $value     The new value matching a fields group.
	 * @param   array    $pks       An array of row IDs.
	 * @param   array    $contexts  An array of item contexts.
	 *
	 * @return  array|boolean  new IDs if successful, false otherwise and internal error is set.
	 *
	 * @since   3.7.0
	 */
	protected function batchCopy($value, $pks, $contexts)
	{
		// Set the variables
		$user      = JFactory::getUser();
		$table     = $this->getTable();
		$newIds    = array();
		$component = $this->state->get('filter.component');
		$value     = (int) $value;

		foreach ($pks as $pk)
		{
			if ($user->authorise('core.create', $component . '.fieldgroup.' . $value))
			{
				$table->reset();
				$table->load($pk);

				$table->group_id = $value;

				// Reset the ID because we are making a copy
				$table->id = 0;

				// Unpublish the new field
				$table->state = 0;

				if (!$table->store())
				{
					$this->setError($table->getError());

					return false;
				}

				// Get the new item ID
				$newId = $table->get('id');

				// Add the new ID to the array
				$newIds[$pk] = $newId;
			}
			else
			{
				$this->setError(JText::_('JLIB_APPLICATION_ERROR_BATCH_CANNOT_CREATE'));

				return false;
			}
		}

		// Clean the cache
		$this->cleanCache();

		return $newIds;
	}

	/**
	 * Batch move fields to a new group.
	 *
	 * @param   integer  $value     The new value matching a fields group.
	 * @param   array    $pks       An array of row IDs.
	 * @param   array    $contexts  An array of item contexts.
	 *
	 * @return  boolean  True if successful, false otherwise and internal error is set.
	 *
	 * @since   3.7.0
	 */
	protected function batchMove($value, $pks, $contexts)
	{
		// Set the variables
		$user      = JFactory::getUser();
		$table     = $this->getTable();
		$context   = explode('.', JFactory::getApplication()->getUserState('com_fields.fields.context'));
		$value     = (int) $value;

		foreach ($pks as $pk)
		{
			if ($user->authorise('core.edit', $context[0] . '.fieldgroup.' . $value))
			{
				$table->reset();
				$table->load($pk);

				$table->group_id = $value;

				if (!$table->store())
				{
					$this->setError($table->getError());

					return false;
				}
			}
			else
			{
				$this->setError(JText::_('JLIB_APPLICATION_ERROR_BATCH_CANNOT_EDIT'));

				return false;
			}
		}

		// Clean the cache
		$this->cleanCache();

		return true;
	}
}