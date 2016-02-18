<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_languages
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Languages Controller.
 *
 * @since  1.5
 */
class LanguagesControllerInstalled extends JControllerLegacy
{
	/**
	 * Task to set the default language.
	 *
	 * @return  void
	 */
	public function setDefault()
	{
		// Check for request forgeries.
		JSession::checkToken() or jexit(JText::_('JInvalid_Token'));

		$cid = $this->input->get('cid', '');
		$model = $this->getModel('installed');

		if ($model->publish($cid))
		{
			$msg = JText::_('COM_LANGUAGES_MSG_DEFAULT_LANGUAGE_SAVED');
			$type = 'message';
		}
		else
		{
			$msg = $this->getError();
			$type = 'error';
		}

		$clientId = $model->getState('filter.client_id');
		$this->setredirect('index.php?option=com_languages&view=installed&client=' . $clientId, $msg, $type);
	}

	/**
	 * Task to switch the administrator language.
	 *
	 * @return  void
	 */
	public function switchAdminLanguage()
	{
		// Check for request forgeries.
		JSession::checkToken() or jexit(JText::_('JInvalid_Token'));

		$cid   = $this->input->get('cid', '');
		$model = $this->getModel('installed');

		// Fetching the language name from the xx-XX.xml
		$file = JPATH_ADMINISTRATOR . '/language/' . $cid . '/' . $cid . '.xml';
		$info = JInstaller::parseXMLInstallFile($file);
		$languageName = $info['name'];

		if ($model->switchAdminLanguage($cid))
		{
			$msg = JText::sprintf('COM_LANGUAGES_MSG_SWITCH_ADMIN_LANGUAGE_SUCCESS', $languageName);
			$type = 'message';
		}
		else
		{
			$msg = $this->getError();
			$type = 'error';
		}

		$clientId = $model->getState('filter.client_id');
		$this->setredirect('index.php?option=com_languages&view=installed&client=' . $clientId, $msg, $type);
	}
}
