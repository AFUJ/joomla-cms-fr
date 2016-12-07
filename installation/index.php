<?php
/**
 * @package    Joomla.Installation
 *
 * @copyright  Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * NOTE: This file should remain compatible with PHP 5.2 to allow us to run our PHP minimum check and show a friendly error message
 */

/**
 * Define the application's minimum supported PHP version as a constant so it can be referenced within the application.
 */
define('JOOMLA_MINIMUM_PHP', '5.5.9');

if (version_compare(PHP_VERSION, JOOMLA_MINIMUM_PHP, '<'))
{
	die('Your host needs to use PHP ' . JOOMLA_MINIMUM_PHP . ' or higher to run this version of Joomla!');
}

/**
 * Constant that is checked in included files to prevent direct access.
 */
define('_JEXEC', 1);

// Bootstrap the application
require_once dirname(__FILE__) . '/application/bootstrap.php';

// Instantiate and execute the application
JFactory::getApplication('web', array(), 'InstallationApplication')->execute();
