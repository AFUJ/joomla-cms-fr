<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_users
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

JFormHelper::loadFieldClass('list');

/**
 * Form Field class for the Joomla Framework.
 *
 * @since  3.5.2
 */
class JFormFieldLevels extends JFormFieldList
{
	/**
	 * The form field type.
	 *
	 * @var     string
	 * @since   3.5.2
	 */
	protected $type = 'Levels';

	/**
	 * Method to get the field options.
	 *
	 * @return  array  The field option objects
	 *
	 * @since   3.5.2
	 */
	protected function getOptions()
	{
		// Merge any additional options in the XML definition.
		return array_merge(parent::getOptions(), UsersHelperDebug::getLevelsOptions());
	}
}
