<?php
/** French distribution: direct access to the French community forum. */
defined('_JEXEC') or die;
if (\Joomla\CMS\Factory::getApplication()->getLanguage()->getTag() === 'fr-FR') {
    \Joomla\CMS\Factory::getApplication()->redirect('https://forum.joomla.fr/');
    return;
}
require JPATH_ADMINISTRATOR . '/components/com_admin/tmpl/help/langforum.php';