<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_content
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('JPATH_BASE') or die;

/**
 * Supports a modal article picker.
 *
 * @since  1.6
 */
class JFormFieldModal_Article extends JFormField
{
	/**
	 * The form field type.
	 *
	 * @var		string
	 * @since   1.6
	 */
	protected $type = 'Modal_Article';

	/**
	 * Method to get the field input markup.
	 *
	 * @return  string	The field input markup.
	 *
	 * @since   1.6
	 */
	protected function getInput()
	{
		$allowEdit  = ((string) $this->element['edit'] == 'true') ? true : false;
		$allowClear = ((string) $this->element['clear'] != 'false') ? true : false;

		// Load language
		JFactory::getLanguage()->load('com_content', JPATH_ADMINISTRATOR);

		// Build the script.
		$script = array();

		// Select button script
		$script[] = '	function jSelectArticle_' . $this->id . '(id, title, catid, object) {';
		$script[] = '		document.getElementById("' . $this->id . '_id").value = id;';
		$script[] = '		document.getElementById("' . $this->id . '_name").value = title;';

		if ($allowEdit)
		{
			$script[] = '		if (id == "' . (int) $this->value . '") {';
			$script[] = '			jQuery("#' . $this->id . '_edit").removeClass("hidden");';
			$script[] = '		} else {';
			$script[] = '			jQuery("#' . $this->id . '_edit").addClass("hidden");';
			$script[] = '		}';
		}

		if ($allowClear)
		{
			$script[] = '		jQuery("#' . $this->id . '_clear").removeClass("hidden");';
		}

		$script[] = '		jQuery("#articleSelect' . $this->id . 'Modal").modal("hide");';

		if ($this->required)
		{
			$script[] = '		document.formvalidator.validate(document.getElementById("' . $this->id . '_id"));';
			$script[] = '		document.formvalidator.validate(document.getElementById("' . $this->id . '_name"));';
		}

		$script[] = '	}';

		// Clear button script
		static $scriptClear;

		if ($allowClear && !$scriptClear)
		{
			$scriptClear = true;

			$script[] = '	function jClearArticle(id) {';
			$script[] = '		document.getElementById(id + "_id").value = "";';
			$script[] = '		document.getElementById(id + "_name").value = "' .
				htmlspecialchars(JText::_('COM_CONTENT_SELECT_AN_ARTICLE', true), ENT_COMPAT, 'UTF-8') . '";';
			$script[] = '		jQuery("#"+id + "_clear").addClass("hidden");';
			$script[] = '		if (document.getElementById(id + "_edit")) {';
			$script[] = '			jQuery("#"+id + "_edit").addClass("hidden");';
			$script[] = '		}';
			$script[] = '		return false;';
			$script[] = '	}';
		}

		// Add the script to the document head.
		JFactory::getDocument()->addScriptDeclaration(implode("\n", $script));

		// Setup variables for display.
		$html = array();
		$linkArticles = 'index.php?option=com_content&amp;view=articles&amp;layout=modal&amp;tmpl=component&amp;function=jSelectArticle_' . $this->id;
		$linkArticle = 'index.php?option=com_content&amp;view=article&amp;layout=modal&amp;tmpl=component&amp;task=article.edit';

		if (isset($this->element['language']))
		{
			$linkArticles .= '&amp;forcedLanguage=' . $this->element['language'];
			$linkArticle .= '&amp;forcedLanguage=' . $this->element['language'];
		}

		if ((int) $this->value > 0)
		{
			$db    = JFactory::getDbo();
			$query = $db->getQuery(true)
				->select($db->quoteName('title'))
				->from($db->quoteName('#__content'))
				->where($db->quoteName('id') . ' = ' . (int) $this->value);
			$db->setQuery($query);

			try
			{
				$title = $db->loadResult();
			}
			catch (RuntimeException $e)
			{
				JError::raiseWarning(500, $e->getMessage());
			}
		}

		if (empty($title))
		{
			$title = JText::_('COM_CONTENT_SELECT_AN_ARTICLE');
		}
		$title = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');

		// The active article id field.
		if (0 == (int) $this->value)
		{
			$value = '';
		}
		else
		{
			$value = (int) $this->value;
		}

		$urlSelect = $linkArticles . '&amp;' . JSession::getFormToken() . '=1';
		$urlEdit = $linkArticle . '&amp;id=' . $value . '&amp;' . JSession::getFormToken() . '=1';

		// The current article display field.
		$html[] = '<span class="input-append">';
		$html[] = '<input type="text" class="input-medium" id="' . $this->id . '_name" value="' . $title . '" disabled="disabled" size="35" />';
		$html[] = '<a href="#articleSelect' . $this->id . 'Modal" class="btn hasTooltip" role="button" data-toggle="modal" title="'
			. JHtml::tooltipText('COM_CONTENT_CHANGE_ARTICLE') . '">'
			. '<span class="icon-file"></span> '
			. JText::_('JSELECT') . '</a>';

		// Edit article button
		if ($allowEdit)
		{
			$html[] = '<a id="' . $this->id . '_edit" href="#articleEdit' . $this->id . 'Modal" class="btn hasTooltip'
				. ($value ? '' : ' hidden') . '" role="button" data-toggle="modal" title="'
				. JHtml::tooltipText('COM_CONTENT_EDIT_ARTICLE') . '">'
				. '<span class="icon-edit"></span> '
				. JText::_('JACTION_EDIT') . '</a>';
		}

		// Clear article button
		if ($allowClear)
		{
			$html[] = '<button id="' . $this->id . '_clear" class="btn' . ($value ? '' : ' hidden') . '" onclick="return jClearArticle(\'' .
				$this->id . '\')"><span class="icon-remove"></span>' . JText::_('JCLEAR') . '</button>';
		}

		$html[] = '</span>';

		// The class='required' for client side validation
		$class = '';

		if ($this->required)
		{
			$class = ' class="required modal-value"';
		}

		$html[] = '<input type="hidden" id="' . $this->id . '_id"' . $class . ' name="' . $this->name . '" value="' . $value . '" />';

		$html[] = JHtml::_(
			'bootstrap.renderModal',
			'articleSelect' . $this->id . 'Modal',
			array(
				'url'         => $urlSelect,
				'title'       => JText::_('COM_CONTENT_CHANGE_ARTICLE'),
				'width'       => '800px',
				'height'      => '400px',
				'modalWidth'  => '80',
				'bodyHeight'  => '70',
				'footer'      => '<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">'
						. JText::_("JLIB_HTML_BEHAVIOR_CLOSE") . '</button>'
			)
		);

		$html[] = JHtml::_(
			'bootstrap.renderModal',
			'articleEdit' . $this->id . 'Modal',
			array(
				'url'         => $urlEdit,
				'title'       => JText::_('COM_CONTENT_EDIT_ARTICLE'),
				'backdrop'    => 'static',
				'closeButton' => false,
				'width'       => '800px',
				'height'      => '400px',
				'modalWidth'  => '80',
				'bodyHeight'  => '70',
				'footer'      => '<button type="button" class="btn" data-dismiss="modal" aria-hidden="true"'
						. ' onclick="jQuery(\'#articleEdit' . $this->id . 'Modal iframe\').contents().find(\'#closeBtn\').click();">'
						. JText::_("JLIB_HTML_BEHAVIOR_CLOSE") . '</button>'
						. '<button type="button" class="btn btn-success" data-dismiss="modal" aria-hidden="true"'
						. ' onclick="jQuery(\'#articleEdit' . $this->id . 'Modal iframe\').contents().find(\'#saveBtn\').click();">'
						. JText::_("JSAVE") . '</button>'
			)
		);

		return implode("\n", $html);
	}

	/**
	 * Method to get the field label markup.
	 *
	 * @return  string  The field label markup.
	 *
	 * @since   3.4
	 */
	protected function getLabel()
	{
		return str_replace($this->id, $this->id . '_id', parent::getLabel());
	}
}
