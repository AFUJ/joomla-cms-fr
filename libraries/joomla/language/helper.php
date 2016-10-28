<?php
/**
 * @package     Joomla.Platform
 * @subpackage  Language
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

defined('JPATH_PLATFORM') or die;

use Joomla\Utilities\ArrayHelper;

/**
 * Language helper class
 *
 * @since  11.1
 */
class JLanguageHelper
{
	/**
	 * Builds a list of the system languages which can be used in a select option
	 *
	 * @param   string   $actualLanguage  Client key for the area
	 * @param   string   $basePath        Base path to use
	 * @param   boolean  $caching         True if caching is used
	 * @param   boolean  $installed       Get only installed languages
	 *
	 * @return  array  List of system languages
	 *
	 * @since   11.1
	 */
	public static function createLanguageList($actualLanguage, $basePath = JPATH_BASE, $caching = false, $installed = false)
	{
		$list = array();

		// Cache activation
		$langs = JLanguage::getKnownLanguages($basePath);

		if ($installed)
		{
			$db = JFactory::getDbo();
			$query = $db->getQuery(true)
				->select('element')
				->from('#__extensions')
				->where('type=' . $db->quote('language'))
				->where('state=0')
				->where('enabled=1')
				->where('client_id=' . ($basePath == JPATH_ADMINISTRATOR ? 1 : 0));
			$db->setQuery($query);
			$installed_languages = $db->loadObjectList('element');
		}

		foreach ($langs as $lang => $metadata)
		{
			if (!$installed || array_key_exists($lang, $installed_languages))
			{
				$option = array();

				$option['text'] = $metadata['name'];
				$option['value'] = $lang;

				if ($lang == $actualLanguage)
				{
					$option['selected'] = 'selected="selected"';
				}

				$list[] = $option;
			}
		}

		return $list;
	}

	/**
	 * Tries to detect the language.
	 *
	 * @return  string  locale or null if not found
	 *
	 * @since   11.1
	 */
	public static function detectLanguage()
	{
		if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
		{
			$browserLangs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
			$systemLangs = self::getLanguages();

			foreach ($browserLangs as $browserLang)
			{
				// Slice out the part before ; on first step, the part before - on second, place into array
				$browserLang = substr($browserLang, 0, strcspn($browserLang, ';'));
				$primary_browserLang = substr($browserLang, 0, 2);

				foreach ($systemLangs as $systemLang)
				{
					// Take off 3 letters iso code languages as they can't match browsers' languages and default them to en
					$Jinstall_lang = $systemLang->lang_code;

					if (strlen($Jinstall_lang) < 6)
					{
						if (strtolower($browserLang) == strtolower(substr($systemLang->lang_code, 0, strlen($browserLang))))
						{
							return $systemLang->lang_code;
						}
						elseif ($primary_browserLang == substr($systemLang->lang_code, 0, 2))
						{
							$primaryDetectedLang = $systemLang->lang_code;
						}
					}
				}

				if (isset($primaryDetectedLang))
				{
					return $primaryDetectedLang;
				}
			}
		}

		return;
	}

	/**
	 * Get available languages
	 *
	 * @param   string  $key  Array key
	 *
	 * @return  array  An array of published languages
	 *
	 * @since   11.1
	 */
	public static function getLanguages($key = 'default')
	{
		static $languages;

		if (empty($languages))
		{
			// Installation uses available languages
			if (JFactory::getApplication()->getClientId() == 2)
			{
				$languages[$key] = array();
				$knownLangs = JLanguage::getKnownLanguages(JPATH_BASE);

				foreach ($knownLangs as $metadata)
				{
					// Take off 3 letters iso code languages as they can't match browsers' languages and default them to en
					$obj = new stdClass;
					$obj->lang_code = $metadata['tag'];
					$languages[$key][] = $obj;
				}
			}
			else
			{
				$cache = JFactory::getCache('com_languages', '');

				if (!$languages = $cache->get('languages'))
				{
					$db = JFactory::getDbo();
					$query = $db->getQuery(true)
						->select('*')
						->from('#__languages')
						->where('published=1')
						->order('ordering ASC');
					$db->setQuery($query);

					$languages['default'] = $db->loadObjectList();
					$languages['sef'] = array();
					$languages['lang_code'] = array();

					if (isset($languages['default'][0]))
					{
						foreach ($languages['default'] as $lang)
						{
							$languages['sef'][$lang->sef] = $lang;
							$languages['lang_code'][$lang->lang_code] = $lang;
						}
					}

					$cache->store($languages, 'languages');
				}
			}
		}

		return $languages[$key];
	}

	/**
	 * Get a list of installed languages.
	 *
	 * @param   integer  $clientId         The client app id.
	 * @param   boolean  $processMetaData  Fetch Language metadata.
	 * @param   boolean  $processManifest  Fetch Language manifest.
	 * @param   string   $pivot            The pivot of the returning array.
	 * @param   string   $orderField       Field to order the results.
	 * @param   string   $orderDirection   Direction to order the results.
	 *
	 * @return  array  Array with the installed languages.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function getInstalledLanguages($clientId = null, $processMetaData = false, $processManifest = false, $pivot = 'element',
		$orderField = null, $orderDirection = null)
	{
		static $installedLanguages = null;

		if ($installedLanguages === null)
		{
			$cache = JFactory::getCache('com_languages', '');

			if (!$installedLanguages = $cache->get('installedlanguages'))
			{
				$db = JFactory::getDbo();

				$query = $db->getQuery(true)
					->select($db->quoteName(array('element', 'name', 'client_id', 'extension_id')))
					->from($db->quoteName('#__extensions'))
					->where($db->quoteName('type') . ' = ' . $db->quote('language'))
					->where($db->quoteName('state') . ' = 0')
					->where($db->quoteName('enabled') . ' = 1');

				$installedLanguages = $db->setQuery($query)->loadObjectList();

				$cache->store($installedLanguages, 'installedlanguages');
			}
		}

		$languages = array();
		$clients   = $clientId === null ? array(0, 1) : array((int) $clientId);

		foreach ($installedLanguages as $language)
		{
			// If the language client is not needed continue cycle. Drop for performance.
			if (!in_array((int) $language->client_id, $clients))
			{
				continue;
			}

			$lang = $language;

			if ($processMetaData || $processManifest)
			{
				$clientPath = (int) $language->client_id === 0 ? JPATH_SITE : JPATH_ADMINISTRATOR;
				$metafile   = JLanguage::getLanguagePath($clientPath, $language->element) . '/' . $language->element . '.xml';

				// Process the language metadata.
				if ($processMetaData)
				{
					$lang->metadata = JLanguage::parseXMLLanguageFile($metafile);

					// No metadata found, not a valid language.
					if (!is_array($lang->metadata))
					{
						continue;
					}
				}

				// Process the language manifest.
				if ($processManifest)
				{
					$lang->manifest = JInstaller::parseXMLInstallFile($metafile);

					// No metadata found, not a valid language.
					if (!is_array($lang->manifest))
					{
						continue;
					}
				}
			}

			$languages[$language->client_id][] = $lang;
		}

		// Order the list, if needed.
		if ($orderField !== null && $orderDirection !== null)
		{
			$orderDirection = strtolower($orderDirection) === 'desc' ? -1 : 1;

			foreach ($languages as $cId => $language)
			{
				// If the language client is not needed continue cycle. Drop for performance.
				if (!in_array($cId, $clients))
				{
					continue;
				}

				$languages[$cId] = ArrayHelper::sortObjects($languages[$cId], $orderField, $orderDirection, true, true);
			}
		}

		// Add the pivot, if needed.
		if ($pivot !== null)
		{
			foreach ($languages as $cId => $language)
			{
				// If the language client is not needed continue cycle. Drop for performance.
				if (!in_array($cId, $clients))
				{
					continue;
				}

				$languages[$cId] = ArrayHelper::pivot($languages[$cId], $pivot);
			}
		}

		return $clientId !== null ? $languages[$clientId] : $languages;
	}

	/**
	 * Get a list of content languages.
	 *
	 * @param   integer  $checkPublished  Check if the content language is published.
	 * @param   integer  $checkInstalled  Check if the content language is installed.
	 * @param   string   $pivot           The pivot of the returning array.
	 * @param   string   $orderField      Field to order the results.
	 * @param   string   $orderDirection  Direction to order the results.
	 *
	 * @return  array  Array of the content languages.
	 *
	 * @since   __DEPLOY_VERSION__
	 */
	public static function getContentLanguages($checkPublished = true, $checkInstalled = true, $pivot = 'lang_code', $orderField = null,
		$orderDirection = null)
	{
		static $contentLanguages = null;

		if ($contentLanguages === null)
		{
			$cache = JFactory::getCache('com_languages', '');

			if (!$contentLanguages = $cache->get('contentlanguages'))
			{
				$db = JFactory::getDbo();

				$query = $db->getQuery(true)
					->select('*')
					->from($db->quoteName('#__languages'));

				$contentLanguages = $db->setQuery($query)->loadObjectList();

				$cache->store($contentLanguages, 'contentlanguages');
			}
		}

		$languages = $contentLanguages;

		// Check if the language is published, if needed.
		if ($checkPublished)
		{
			foreach ($languages as $key => $language)
			{
				if ((int) $language->published === 0)
				{
					unset($languages[$key]);
				}
			}
		}

		// Check if the language is installed, if needed.
		if ($checkInstalled)
		{
			$languages = array_values(array_intersect_key(ArrayHelper::pivot($languages, 'lang_code'), static::getInstalledLanguages(0)));
		}

		// Order the list, if needed.
		if ($orderField !== null && $orderDirection !== null)
		{
			$languages = ArrayHelper::sortObjects($languages, $orderField, strtolower($orderDirection) === 'desc' ? -1 : 1, true, true);
		}

		// Add the pivot, if needed.
		if ($pivot !== null)
		{
			$languages = ArrayHelper::pivot($languages, $pivot);
		}

		return $languages;
	}
}
