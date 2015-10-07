<?php
/**
 * @package     Joomla.Site
 * @subpackage  Layout
 *
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

// Including fallback code for HTML5 non supported browsers.
JHtml::_('jquery.framework');
JHtml::_('script', 'system/html5fallback.js', false, true);

$data = new JRegistry($displayData);

// Always use the 'radio' class.
$classes   = $data->get('classes', array());
$classes[] = 'radio';

/**
 * The format of the input tag to be filled in using sprintf.
 *     %1 - id
 *     %2 - name
 *     %3 - value
 *     %4 = any other attributes
 */
$format = '<input type="radio" id="%1$s" name="%2$s" value="%3$s" %4$s />';

$id      = $data->get('id', '');
$name    = $data->get('name', '');
$value   = $data->get('value', '');
$options = $data->get('options', array());
$alt     = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $name);
?>

<fieldset id="<?php echo $id; ?>" class="<?php echo implode(' ', $classes); ?>"
	<?php echo $data->get('disabled') ? 'disabled' : ''; ?>
	<?php echo $data->get('required') ? 'required aria-required="true"' : ''; ?>
	<?php echo $data->get('autofocus') ? 'autofocus' : ''; ?>>

	<?php if (!empty($options)) : ?>
		<?php foreach ($options as $i => $option) : ?>
			<?php // Initialize some option attributes. ?>
			<?php $checked  = ((string) $option->value == $value) ? 'checked="checked"' : ''; ?>
			<?php $class    = !empty($option->class) ? 'class="' . $option->class . '"' : ''; ?>
			<?php $disabled = !empty($option->disable) || ($data->get('disabled') && !$checked) ? 'disabled' : ''; ?>

			<?php // Initialize some JavaScript option attributes. ?>
			<?php $onclick    = !empty($option->onclick) ? 'onclick="' . $option->onclick . '"' : ''; ?>
			<?php $onchange   = !empty($option->onchange) ? 'onchange="' . $option->onchange . '"' : ''; ?>
			<?php $oid        = $id . $i; ?>
			<?php $ovalue     = htmlspecialchars($option->value, ENT_COMPAT, 'UTF-8'); ?>
			<?php $attributes = array_filter(array($checked, $class, $disabled, $onchange, $onclick)); ?>

			<?php if ($data->get('required')) : ?>
				<?php $attributes[] = 'required aria-required="true"'; ?>
			<?php endif; ?>
			<?php echo sprintf($format, $oid, $name, $ovalue, implode(' ', $attributes)); ?>
			<label for="<?php echo $oid; ?>" <?php echo $class; ?>>
				<?php echo JText::alt($option->text, $alt); ?>
			</label>
		<?php endforeach; ?>
	<?php endif; ?>
</fieldset>
