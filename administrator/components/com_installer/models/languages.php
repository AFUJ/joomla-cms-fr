<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_installer
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

jimport('joomla.updater.update');
use Joomla\String\StringHelper;

/**
 * Languages Installer Model
 *
 * @since  2.5.7
 */
class InstallerModelLanguages extends JModelList
{
	/**
	 * Language count
	 *
	 * @var     integer
	 * @since   __DEPLOY_VERSION__
	 */
	private $languageCount;

	/**
	 * Constructor override, defines a whitelist of column filters.
	 *
	 * @param   array  $config  An optional associative array of configuration settings.
	 *
	 * @since   2.5.7
	 */
	public function __construct($config = array())
	{
		if (empty($config['filter_fields']))
		{
			$config['filter_fields'] = array(
				'name',
				'element',
			);
		}

		parent::__construct($config);
	}

	/**
	 * Get the Update Site
	 *
	 * @since   __DEPLOY_VERSION__
	 *
	 * @return  string  The URL of the Accredited Languagepack Updatesite XML
	 */
	private function getUpdateSite()
	{
		$db    = $this->getDbo();
		$query = $db->getQuery(true);

		$query->select($db->quoteName('us.location'));
		$query->from($db->quoteName('#__extensions', 'e'))
			->where($db->quoteName('e.type') . ' = ' . $db->quote('package'))
			->where($db->quoteName('e.element') . ' = ' . $db->quote('pkg_en-GB'))
			->where($db->quoteName('e.client_id') . ' = 0');
		$query->join('LEFT', $db->quoteName('#__update_sites_extensions', 'use') . ' ON use.extension_id = e.extension_id');
		$query->join('LEFT', $db->quoteName('#__update_sites', 'us') . ' ON us.update_site_id = use.update_site_id');

		$db->setQuery($query);

		return $db->loadResult();
	}

	/**
	 * Method to get an array of data items.
	 *
	 * @return  mixed  An array of data items on success, false on failure.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public function getItems()
	{
		// Get a storage key.
		$store = $this->getStoreId();

		// Try to load the data from internal storage.
		if (isset($this->cache[$store]))
		{
			return $this->cache[$store];
		}

		try
		{
			// Load the list items and add the items to the internal cache.
			$this->cache[$store] = $this->getLanguages();
		}
		catch (RuntimeException $e)
		{
			$this->setError($e->getMessage());

			return false;
		}

		return $this->cache[$store];
	}

	/**
	 * Gets an array of objects from the updatesite.
	 *
	 * @return  object[]  An array of results.
	 *
	 * @since   3.0
	 * @throws  RuntimeException
	 */
	protected function getLanguages()
	{
		$updateSite = $this->getUpdateSite();

		$jhttp = new JHttp;
		$response = $jhttp->get($updateSite);

		$updateSiteXML = simplexml_load_string($response->body);

		$languages = array();

		$search = strtolower($this->getState('filter.search'));

		foreach ($updateSiteXML->extension as $extension)
		{
			$language = new stdClass;

			foreach ($extension->attributes() as $key => $value)
			{
				$language->$key =  (string) $value;
			}

			if ($search)
			{
				if (strpos(strtolower($language->name), $search) === false
					&& strpos(strtolower($language->element), $search) === false)
				{
					continue;
				}
			}

			$languages[$language->name] = $language;
		}

		// Sort the array by value of subarray
		usort(
			$languages,
			function($a, $b)
			{
				$ordering = $this->getState('list.ordering');

				if (strtolower($this->getState('list.direction')) === 'asc')
				{
					return StringHelper::strcmp($a->$ordering, $b->$ordering);
				}
				else
				{
					return StringHelper::strcmp($b->$ordering, $a->$ordering);
				}
			}
		);

		// Count the non-paginated list
		$this->languageCount = count($languages);

		$languages = array_slice($languages, $this->getStart(), $this->getState('list.limit'));

		return $languages;
	}

	/**
	 * Returns a record count for the updatesite.
	 *
	 * @param   JDatabaseQuery|string  $query  The query.
	 *
	 * @return  integer  Number of rows for query.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function _getListCount($query)
	{
		return $this->languageCount;
	}

	/**
	 * Method to get a store id based on model configuration state.
	 *
	 * @param   string  $id  A prefix for the store id.
	 *
	 * @return  string  A store id.
	 *
	 * @since   2.5.7
	 */
	protected function getStoreId($id = '')
	{
		// Compile the store id.
		$id .= ':' . $this->getState('filter.search');

		return parent::getStoreId($id);
	}

	/**
	 * Method to auto-populate the model state.
	 *
	 * Note. Calling getState in this method will result in recursion.
	 *
	 * @param   string  $ordering   list order
	 * @param   string  $direction  direction in the list
	 *
	 * @return  void
	 *
	 * @since   2.5.7
	 */
	protected function populateState($ordering = 'name', $direction = 'asc')
	{
		$this->setState('filter.search', $this->getUserStateFromRequest($this->context . '.filter.search', 'filter_search', '', 'string'));

		$this->setState('extension_message', JFactory::getApplication()->getUserState('com_installer.extension_message'));

		parent::populateState($ordering, $direction);
	}

	/**
	 * Method to compare two languages in order to sort them.
	 *
	 * @param   object  $lang1  The first language.
	 * @param   object  $lang2  The second language.
	 *
	 * @return  integer
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	protected function compareLanguages($lang1, $lang2)
	{
		return strcmp($lang1->name, $lang2->name);
	}

}
