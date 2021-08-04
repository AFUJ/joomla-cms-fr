<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_joomlaupdate
 *
 * @copyright   (C) 2016 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\HTML\HTMLHelper;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Utility\Utility;
use Joomla\Component\Joomlaupdate\Administrator\View\Joomlaupdate\HtmlView;

/** @var HtmlView $this */

HTMLHelper::_('behavior.core');
Text::script('COM_INSTALLER_MSG_INSTALL_PLEASE_SELECT_A_PACKAGE', true);
Text::script('COM_INSTALLER_MSG_WARNINGS_UPLOADFILETOOBIG', true);
Text::script('JGLOBAL_SELECTED_UPLOAD_FILE_SIZE', true);
?>

<div class="alert alert-info">
	<span class="icon-info-circle" aria-hidden="true"></span><span class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
	<?php echo Text::sprintf('COM_JOOMLAUPDATE_VIEW_DEFAULT_UPLOAD_INTRO', 'https://downloads.joomla.org/latest'); ?>
</div>

<?php if (count($this->warnings)) : ?>
	<h3><?php echo Text::_('COM_INSTALLER_SUBMENU_WARNINGS'); ?></h3>
	<?php foreach ($this->warnings as $warning) : ?>
		<div class="alert alert-warning">
			<h4 class="alert-heading">
				<span class="icon-exclamation-triangle" aria-hidden="true"></span>
				<span class="visually-hidden"><?php echo Text::_('WARNING'); ?></span>
				<?php echo $warning['message']; ?>
			</h4>
			<p class="mb-0"><?php echo $warning['description']; ?></p>
		</div>
	<?php endforeach; ?>
	<div class="alert alert-info">
		<h4 class="alert-heading">
			<span class="icon-info-circle" aria-hidden="true"></span>
			<span class="visually-hidden"><?php echo Text::_('INFO'); ?></span>
			<?php echo Text::_('COM_INSTALLER_MSG_WARNINGFURTHERINFO'); ?>
		</h4>
		<p class="mb-0"><?php echo Text::_('COM_INSTALLER_MSG_WARNINGFURTHERINFODESC'); ?></p>
	</div>
<?php endif; ?>

<form enctype="multipart/form-data" action="index.php" method="post" id="uploadForm">
	<fieldset class="uploadform options-form">
		<legend><?php echo Text::_('COM_JOOMLAUPDATE_VIEW_DEFAULT_TAB_UPLOAD'); ?></legend>

		<div class="control-group">
			<label for="install_package" class="control-label">
				<?php echo Text::_('COM_JOOMLAUPDATE_VIEW_UPLOAD_PACKAGE_FILE'); ?>
			</label>
			<div class="controls">
				<input class="form-control-file" id="install_package" name="install_package" type="file" size="57" accept=".zip,application/zip" onchange="Joomla.installpackageChange()">
				<?php $maxSizeBytes = Utility::getMaxUploadSize(); ?>
				<?php $maxSize = HTMLHelper::_('number.bytes', $maxSizeBytes); ?>
				<input id="max_upload_size" name="max_upload_size" type="hidden" value="<?php echo $maxSizeBytes; ?>"/>
				<div class="form-text"><?php echo Text::sprintf('JGLOBAL_MAXIMUM_UPLOAD_SIZE_LIMIT', '&#x200E;' . $maxSize); ?></div>
				<div class="form-text hidden" id="file_size" name="file_size"><?php echo Text::sprintf('JGLOBAL_SELECTED_UPLOAD_FILE_SIZE', '&#x200E;' . ''); ?></div>
				<div class="alert alert-warning hidden" id="max_upload_size_warn">
					<?php echo Text::_('COM_INSTALLER_MSG_WARNINGS_UPLOADFILETOOBIG'); ?>
				</div>
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<button id="uploadButton" class="btn btn-primary" type="button" onclick="Joomla.submitbuttonUpload()"><?php echo Text::_('COM_INSTALLER_UPLOAD_AND_INSTALL'); ?></button>
			</div>
		</div>

	</fieldset>

	<input type="hidden" name="task" value="update.upload">
	<input type="hidden" name="option" value="com_joomlaupdate">
	<?php echo HTMLHelper::_('form.token'); ?>

</form>
