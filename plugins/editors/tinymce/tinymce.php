<?php
/**
 * @package     Joomla.Plugin
 * @subpackage  Editors.tinymce
 *
 * @copyright   Copyright (C) 2005 - 2016 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * TinyMCE Editor Plugin
 *
 * @since  1.5
 */
class PlgEditorTinymce extends JPlugin
{
	/**
	 * Base path for editor files
	 */
	protected $_basePath = 'media/editors/tinymce';

	/**
	 * Load the language file on instantiation.
	 *
	 * @var    boolean
	 * @since  3.1
	 */
	protected $autoloadLanguage = true;

	/**
	 * Loads the application object
	 *
	 * @var    JApplicationCms
	 * @since  3.2
	 */
	protected $app = null;

	/**
	 * Initialises the Editor.
	 *
	 * @return  string  JavaScript Initialization string
	 *
	 * @since   1.5
	 */
	public function onInit()
	{
		JHtml::_('behavior.polyfill', array('event'), 'lt IE 9');
		JHtml::_('script', $this->_basePath . '/tinymce.min.js', array('version' => 'auto'));
		JHtml::_('script', 'system/tinymce-init.min.js', array('version' => 'auto', 'relative' => true));
	}

	/**
	 * TinyMCE WYSIWYG Editor - get the editor content
	 *
	 * @param   string  $editor  The name of the editor
	 *
	 * @return  string
	 */
	public function onGetContent($editor)
	{
		return 'tinyMCE.activeEditor.getContent();';
	}

	/**
	 * TinyMCE WYSIWYG Editor - set the editor content
	 *
	 * @param   string  $editor  The name of the editor
	 * @param   string  $html    The html to place in the editor
	 *
	 * @return  string
	 */
	public function onSetContent($editor, $html)
	{
		return 'tinyMCE.activeEditor.setContent(' . $html . ');';
	}

	/**
	 * TinyMCE WYSIWYG Editor - copy editor content to form field
	 *
	 * @param   string  $editor  The name of the editor
	 *
	 * @return  string
	 */
	public function onSave($editor)
	{
		return 'if (tinyMCE.get("' . $editor . '").isHidden()) {tinyMCE.get("' . $editor . '").show()};';
	}

	/**
	 * Inserts html code into the editor
	 *
	 * @param   string  $name  The name of the editor
	 *
	 * @return  void
	 *
	 * @deprecated 3.5 tinyMCE (API v4) will get the content automatically from the text area
	 */
	public function onGetInsertMethod($name)
	{
		return;
	}

	/**
	 * Display the editor area.
	 *
	 * @param   string   $name     The name of the editor area.
	 * @param   string   $content  The content of the field.
	 * @param   string   $width    The width of the editor area.
	 * @param   string   $height   The height of the editor area.
	 * @param   int      $col      The number of columns for the editor area.
	 * @param   int      $row      The number of rows for the editor area.
	 * @param   boolean  $buttons  True and the editor buttons will be displayed.
	 * @param   string   $id       An optional ID for the textarea. If not supplied the name is used.
	 * @param   string   $asset    The object asset
	 * @param   object   $author   The author.
	 *
	 * @return  string
	 */
	public function onDisplay($name, $content, $width, $height, $col, $row, $buttons = true, $id = null, $asset = null, $author = null)
	{
		if (empty($id))
		{
			$id = $name;
		}

		$id = preg_replace('/(\s|[^A-Za-z0-9_])+/', '_', $id);

		// Only add "px" to width and height if they are not given as a percentage
		if (is_numeric($width))
		{
			$width .= 'px';
		}

		if (is_numeric($height))
		{
			$height .= 'px';
		}

		// Data object for the layout
		$textarea = new stdClass;
		$textarea->name    = $name;
		$textarea->id      = $id;
		$textarea->class   = 'mce_editable joomla-editor-tinymce';
		$textarea->cols    = $col;
		$textarea->rows    = $row;
		$textarea->width   = $width;
		$textarea->height  = $height;
		$textarea->content = $content;

		// Render Editor markup
		$editor = '<div class="editor">';
		$editor .= JLayoutHelper::render('joomla.tinymce.textarea', $textarea);
		$editor .= $this->_toogleButton($id);
		$editor .= '</div>';

		// Setup Default options for the Editor script
		$doc      = JFactory::getDocument();
		$options  = $doc->getScriptOptions('plg_editor_tinymce');

		// Check whether we alredy have them
		if (!empty($options['tinyMCE']['default']))
		{
			return $editor;
		}

		$app      = JFactory::getApplication();
		$user     = JFactory::getUser();
		$language = JFactory::getLanguage();
		$theme    = 'modern';
		$access   = array_flip($user->getAuthorisedViewLevels());

		// Get configuration for User view level
		$setAccess       = array();
		$extraOptions    = new stdClass;
		$extraOptionsAll = $this->params->get('configuration.setoptions', array());

		foreach ($extraOptionsAll as $set => $val)
		{
			$setAccess[$set] = empty($val->access) ? 1 : $val->access;

			if (isset($access[$setAccess[$set]]))
			{
				$extraOptions = $val;
			}
		}

		$toolbarParams    = new stdClass;
		$toolbarParamsAll = $this->params->get('configuration.toolbars', array());

		foreach ($toolbarParamsAll as $set => $val)
		{
			if (isset($access[$setAccess[$set]]))
			{
				$toolbarParams = $val;
			}
		}

		// Merge the params
		$levelParams = new Joomla\Registry\Registry($toolbarParams);
		$levelParams->loadObject($extraOptions);

		// List the skins
		$skindirs = glob(JPATH_ROOT . '/media/editors/tinymce/skins' . '/*', GLOB_ONLYDIR);

		// Set the selected skin
		$skin = 'lightgray';
		$side = $app->isAdmin() ? 'skin_admin' : 'skin';

		if ((int) $this->params->get($side, 0) < count($skindirs))
		{
			$skin = basename($skindirs[(int) $this->params->get($side, 0)]);
		}

		$langMode        = $this->params->get('lang_mode', 0);
		$langPrefix      = $this->params->get('lang_code', 'en');

		if ($langMode)
		{
			if (file_exists(JPATH_ROOT . "/media/editors/tinymce/langs/" . $language->getTag() . ".js"))
			{
				$langPrefix = $language->getTag();
			}
			elseif (file_exists(JPATH_ROOT . "/media/editors/tinymce/langs/" . substr($language->getTag(), 0, strpos($language->getTag(), '-')) . ".js"))
			{
				$langPrefix = substr($language->getTag(), 0, strpos($language->getTag(), '-'));
			}
			else
			{
				$langPrefix = "en";
			}
		}

		$text_direction = 'ltr';

		if ($language->isRtl())
		{
			$text_direction = 'rtl';
		}

		$use_content_css    = $levelParams->get('content_css', 1);
		$content_css_custom = $levelParams->get('content_css_custom', '');

		/*
		 * Lets get the default template for the site application
		 */
		$db    = JFactory::getDbo();
		$query = $db->getQuery(true)
			->select('template')
			->from('#__template_styles')
			->where('client_id=0 AND home=' . $db->quote('1'));

		$db->setQuery($query);

		try
		{
			$template = $db->loadResult();
		}
		catch (RuntimeException $e)
		{
			$app->enqueueMessage(JText::_('JERROR_AN_ERROR_HAS_OCCURRED'), 'error');

			return '';
		}

		$content_css    = null;
		$templates_path = JPATH_SITE . '/templates';

		// Loading of css file for 'styles' dropdown
		if ($content_css_custom)
		{
			// If URL, just pass it to $content_css
			if (strpos($content_css_custom, 'http') !== false)
			{
				$content_css = $content_css_custom;
			}

			// If it is not a URL, assume it is a file name in the current template folder
			else
			{
				$content_css = JUri::root(true) . '/templates/' . $template . '/css/' . $content_css_custom;

				// Issue warning notice if the file is not found (but pass name to $content_css anyway to avoid TinyMCE error
				if (!file_exists($templates_path . '/' . $template . '/css/' . $content_css_custom))
				{
					$msg = sprintf(JText::_('PLG_TINY_ERR_CUSTOMCSSFILENOTPRESENT'), $content_css_custom);
					JLog::add($msg, JLog::WARNING, 'jerror');
				}
			}
		}
		else
		{
			// Process when use_content_css is Yes and no custom file given
			if ($use_content_css)
			{
				// First check templates folder for default template
				// if no editor.css file in templates folder, check system template folder
				if (!file_exists($templates_path . '/' . $template . '/css/editor.css'))
				{
					// If no editor.css file in system folder, show alert
					if (!file_exists($templates_path . '/system/css/editor.css'))
					{
						JLog::add(JText::_('PLG_TINY_ERR_EDITORCSSFILENOTPRESENT'), JLog::WARNING, 'jerror');
					}
					else
					{
						$content_css = JUri::root(true) . '/templates/system/css/editor.css';
					}
				}
				else
				{
					$content_css = JUri::root(true) . '/templates/' . $template . '/css/editor.css';
				}
			}
		}

		$ignore_filter = false;

		// Text filtering
		if ($levelParams->get('use_config_textfilters', 0))
		{
			// Use filters from com_config
			$filter = static::getGlobalFilters();

			$ignore_filter = $filter === false;

			$tagBlacklist  = !empty($filter->tagBlacklist) ? $filter->tagBlacklist : array();
			$attrBlacklist = !empty($filter->attrBlacklist) ? $filter->attrBlacklist : array();
			$tagArray      = !empty($filter->tagArray) ? $filter->tagArray : array();
			$attrArray     = !empty($filter->attrArray) ? $filter->attrArray : array();

			$invalid_elements  = implode(',', array_merge($tagBlacklist, $attrBlacklist, $tagArray, $attrArray));

			// Valid elements are all whitelist entries in com_config, which are now missing in the tagBlacklist
			$default_filter = JFilterInput::getInstance();
			$valid_elements = implode(',', array_diff($default_filter->tagBlacklist, $tagBlacklist));

			$extended_elements = '';
		}
		else
		{
			// Use filters from TinyMCE params
			$invalid_elements  = trim($levelParams->get('invalid_elements', 'script,applet,iframe'));
			$extended_elements = trim($levelParams->get('extended_elements', ''));
			$valid_elements    = trim($levelParams->get('valid_elements', ''));
		}

		$html_height = $this->params->get('html_height', '550');
		$html_width  = $this->params->get('html_width', '');

		if ($html_width == 750)
		{
			$html_width = '';
		}

		// The param is true for vertical resizing only, false or both
		$resizing          = (bool) $levelParams->get('resizing', true);
		$resize_horizontal = (bool) $levelParams->get('resize_horizontal', true);

		if ($resizing && $resize_horizontal)
		{
			$resizing = 'both';
		}

		// Set of always available plugins
		$plugins  = array(
			'autolink',
			'lists',
			'save',
			'colorpicker',
			'importcss',
		);

		// Allowed elements
		$elements = array(
			'hr[id|title|alt|class|width|size|noshade]',
		);

		if ($extended_elements)
		{
			$elements = array_merge($elements, explode(',', $extended_elements));
		}

		// Prepare the toolbar/menubar
		$knownButtons = static::getKnownButtons();

		// Check if there no value at all
		if (!$levelParams->get('menu') && !$levelParams->get('toolbar1') && !$levelParams->get('toolbar2'))
		{
			// Set from preset
			$presets = static::getToolbarPreset();

			// Presets: 3 is special = advances, 2 is registered = medium, all else is public = simple
			$preset = isset($access[3]) ? $presets['advanced'] :
				(isset($access[2]) ? $presets['medium'] : $presets['simple']);

			$levelParams->loadArray($preset);
		}

		$menubar  = (array) $levelParams->get('menu', array());
		$toolbar1 = (array) $levelParams->get('toolbar1', array());
		$toolbar2 = (array) $levelParams->get('toolbar2', array());

		// Make an easy way to check which button is enabled
		$allButtons = array_merge($toolbar1, $toolbar2);
		$allButtons = array_combine($allButtons, $allButtons);

		// Check for button-specific plugins
		foreach ($allButtons as $btnName)
		{
			if (!empty($knownButtons[$btnName]['plugin']))
			{
				$plugins[] = $knownButtons[$btnName]['plugin'];
			}
		}

		// Template
		$templates = array();

		if (!empty($allButtons['template']))
		{
			// Note this check for the template_list.js file will be removed in Joomla 4.0
			if (is_file(JPATH_ROOT . "/media/editors/tinymce/templates/template_list.js"))
			{
				// If using the legacy file we need to include and input the files the new way
				$str = file_get_contents(JPATH_ROOT . "/media/editors/tinymce/templates/template_list.js");

				// Find from one [ to the last ]
				$matches = array();
				preg_match_all('/\[.*\]/', $str, $matches);

				// Set variables
				foreach ($matches['0'] as $match)
				{
					$values = array();
					preg_match_all('/\".*\"/', $match, $values);
					$result       = trim($values["0"]["0"], '"');
					$final_result = explode(',', $result);

					$templates[] = array(
						'title' => trim($final_result['0'], ' " '),
						'description' => trim($final_result['2'], ' " '),
						'url' => JUri::root(true) . '/' . trim($final_result['1'], ' " '),
					);
				}

			}
			else
			{
				foreach (glob(JPATH_ROOT . '/media/editors/tinymce/templates/*.html') as $filename)
				{
					$filename = basename($filename, '.html');

					if ($filename !== 'index')
					{
						$lang        = JFactory::getLanguage();
						$title       = $filename;
						$description = ' ';

						if ($lang->hasKey('PLG_TINY_TEMPLATE_' . strtoupper($filename) . '_TITLE'))
						{
							$title = JText::_('PLG_TINY_TEMPLATE_' . strtoupper($filename) . '_TITLE');
						}

						if ($lang->hasKey('PLG_TINY_TEMPLATE_' . strtoupper($filename) . '_DESC'))
						{
							$description = JText::_('PLG_TINY_TEMPLATE_' . strtoupper($filename) . '_DESC');
						}

						$templates[] = array(
							'title' => $title,
							'description' => $description,
							'url' => JUri::root(true) . '/media/editors/tinymce/templates/' . $filename . '.html',
						);
					}
				}
			}
		}

		// Check for extra plugins, from the setoptions form
		foreach (array('wordcount' => 1, 'advlist' => 1, 'autosave' => 1, 'contextmenu' => 1) as $pName => $def)
		{
			if ($levelParams->get($pName, $def))
			{
				$plugins[] = $pName;
			}
		}

		// User custom plugins and buttons
		$custom_plugin = trim($levelParams->get('custom_plugin', ''));
		$custom_button = trim($levelParams->get('custom_button', ''));

		if ($custom_plugin)
		{
			$separator = strpos($custom_plugin, ',') !== false ? ',' : ' ';
			$plugins   = array_merge($plugins, explode($separator, $custom_plugin));
		}

		if ($custom_button)
		{
			$separator = strpos($custom_button, ',') !== false ? ',' : ' ';
			$toolbar2  = array_merge($toolbar2, explode($separator, $custom_button));
		}

		// We shall put the XTD button inside tinymce
		$btns      = $this->tinyButtons($id, $buttons);
		$btnsNames = $btns['names'];
		$tinyBtns  = implode("; ", $btns['script']);

		if (!empty($btnsNames))
		{
			// Add them to the first toolbar
			$toolbar1 = array_merge($toolbar1, array('|'), $btnsNames);

			JHtml::_('script', 'system/tiny-close.min.js', array('version' => 'auto', 'relative' => true), array('defer' => 'defer'));
		}

		// Drag and drop Images
		$allowImgPaste = false;
		$dragdrop      = $levelParams->get('drag_drop', 1);

		if ($dragdrop && $user->authorise('core.create', 'com_media'))
		{
			$plugins[]     = 'jdragdrop';
			$allowImgPaste = true;
			$isSubDir      = '';
			$session       = JFactory::getSession();
			$uploadUrl     = JUri::base() . 'index.php?option=com_media&task=file.upload&tmpl=component&'
				. $session->getName() . '=' . $session->getId()
				. '&' . JSession::getFormToken() . '=1'
				. '&asset=image&format=json';

			if ($app->isSite())
			{
				$uploadUrl = htmlentities($uploadUrl, null, 'UTF-8', null);
			}

			// Is Joomla installed in subdirectory
			if (JUri::root(true) != '/')
			{
				$isSubDir = JUri::root(true);
			}

			// Get specific path
			$tempPath = $levelParams->get('path', '');

			if (!empty($tempPath))
			{
				$tempPath = rtrim($tempPath, '/');
				$tempPath = ltrim($tempPath, '/');
			}

			JText::script('PLG_TINY_ERR_UNSUPPORTEDBROWSER');
			$doc->addScriptDeclaration(
				"
		var setCustomDir    = '" . $isSubDir . "';
		var mediaUploadPath = '" . $tempPath . "';
		var uploadUri       = '" . $uploadUrl . "';
			"
			);
		}

		// Build the final options set
		$scriptOptions = array(
			'suffix'  => '.min',
			'baseURL' => JUri::root(true) . '/media/editors/tinymce',
			'directionality' => $text_direction,
			'language' => $langPrefix,
			'autosave_restore_when_empty' => false,
			'skin'   => $skin,
			'theme'  => $theme,
			'schema' => 'html5',

			// Toolbars
			'menubar'  => empty($menubar)  ? false : implode(' ', array_unique($menubar)),
			'toolbar1' => empty($toolbar1) ? null  : implode(' ', $toolbar1),
			'toolbar2' => empty($toolbar2) ? null  : implode(' ', $toolbar2),

			'plugins'  => implode(',', array_unique($plugins)),

			// Cleanup/Output
			'inline_styles'    => true,
			'gecko_spellcheck' => true,
			'entity_encoding'  => $levelParams->get('entity_encoding', 'raw'),
			'verify_html'      => !$ignore_filter,

			'valid_elements'          => $valid_elements,
			'extended_valid_elements' => implode(',', $elements),
			'invalid_elements'        => $invalid_elements,

			// URL
			'relative_urls'      => (bool) $levelParams->get('relative_urls', true),
			'remove_script_host' => false,

			// Layout
			'content_css'        => $content_css,
			'document_base_url'  => JUri::root(true) . '/',
			'paste_data_images'  => $allowImgPaste,
			'importcss_append'   => true,
			'height'             => $html_height,
			'width'              => $html_width,
			'resize'             => $resizing,
			'templates'          => $templates,
			'image_advtab'       => (bool) $levelParams->get('image_advtab', false),

			// @TODO make it better, do not generate JavaScript in PHP !!!
			'setupCallbackString' => $tinyBtns,
		);

		if ($levelParams->get('newlines'))
		{
			// Break
			$scriptOptions['force_br_newlines'] = true;
			$scriptOptions['force_p_newlines']  = false;
			$scriptOptions['forced_root_block'] = '';
		}
		else
		{
			// Paragraph
			$scriptOptions['force_br_newlines'] = false;
			$scriptOptions['force_p_newlines']  = true;
			$scriptOptions['forced_root_block'] = 'p';
		}

		$scriptOptions['rel_list'] = array(
			array('title' => 'Alternate', 'value' => 'alternate'),
			array('title' => 'Author', 'value' => 'author'),
			array('title' => 'Bookmark', 'value' => 'bookmark'),
			array('title' => 'Help', 'value' => 'help'),
			array('title' => 'License', 'value' => 'license'),
			array('title' => 'Lightbox', 'value' => 'lightbox'),
			array('title' => 'Next', 'value' => 'next'),
			array('title' => 'No Follow', 'value' => 'nofollow'),
			array('title' => 'No Referrer', 'value' => 'noreferrer'),
			array('title' => 'Prefetch', 'value' => 'prefetch'),
			array('title' => 'Prev', 'value' => 'prev'),
			array('title' => 'Search', 'value' => 'search'),
			array('title' => 'Tag', 'value' => 'tag'),
		);

		/**
		 * Shrink the buttons if not on a mobile or if mobile view is off.
		 * If mobile view is on force into simple mode and enlarge the buttons
		 **/
		if (!$this->app->client->mobile)
		{
			$scriptOptions['toolbar_items_size'] = 'small';
		}
		elseif ($levelParams->get('mobile', 0))
		{
			$scriptOptions['menubar'] = false;
			unset($scriptOptions['toolbar2']);
		}

		$options['tinyMCE']['default'] = $scriptOptions;

		$doc->addStyleDeclaration(".mce-in { padding: 5px 10px !important;}");
		$doc->addScriptOptions('plg_editor_tinymce', $options);

		return $editor;
	}

	/**
	 * Get the toggle editor button
	 *
	 * @param   string  $name  Editor name
	 *
	 * @return  string
	 */
	private function _toogleButton($name)
	{
		return JLayoutHelper::render('joomla.tinymce.togglebutton', $name);
	}

	/**
	 * Get the XTD buttons and render them inside tinyMCE
	 *
	 * @param   string  $name      the id of the editor field
	 * @param   string  $excluded  the buttons that should be hidden
	 *
	 * @return array
	 */
	private function tinyButtons($name, $excluded)
	{
		// Get the available buttons
		$buttons = $this->_subject->getButtons($name, $excluded);

		// Init the arrays for the buttons
		$tinyBtns  = array();
		$btnsNames = array();

		// Build the script
		foreach ($buttons as $i => $button)
		{
			if ($button->get('name'))
			{
				// Set some vars
				$name    = 'button-' . $i . str_replace(" ", "", $button->get('text'));
				$title   = $button->get('text');
				$onclick = ($button->get('onclick')) ? $button->get('onclick') : null;
				$options = $button->get('options');
				$icon    = $button->get('name');

				if ($button->get('link') != "#")
				{
					$href = JUri::base() . $button->get('link');
				}
				else
				{
					$href = null;
				}

				// We do some hack here to set the correct icon for 3PD buttons
				$icon = 'none icon-' . $icon;

				// Now we can built the script
				$tempConstructor = '
			!(function(){';

				// Get the modal width/height
				if ($options && is_scalar($options))
				{
					$tempConstructor .= '
				var getBtnOptions = new Function("return ' . addslashes($options) . '"),
					btnOptions = getBtnOptions(),
					modalWidth = btnOptions.size && btnOptions.size.x ?  btnOptions.size.x : null,
					modalHeight = btnOptions.size && btnOptions.size.y ?  btnOptions.size.y : null;';
				}
				else
				{
					$tempConstructor .= '
				var btnOptions = {}, modalWidth = null, modalHeight = null;';
				}

				$tempConstructor .= "
				editor.addButton(\"" . $name . "\", {
					text: \"" . $title . "\",
					title: \"" . $title . "\",
					icon: \"" . $icon . "\",
					onclick: function () {";

				if ($button->get('modal') || $href)
				{
					$tempConstructor .= "
							var modalOptions = {
								title  : \"" . $title . "\",
								url : '" . $href . "',
								buttons: [{
									text   : \"Close\",
									onclick: \"close\"
								}]
							}
							if(modalWidth){
								modalOptions.width = modalWidth;
							}
							if(modalHeight){
								modalOptions.height = modalHeight;
							}
							editor.windowManager.open(modalOptions);";

					if ($onclick && ($button->get('modal') || $href))
					{
						$tempConstructor .= "\r\n
						" . $onclick . "
							";
					}
				}
				else
				{
					$tempConstructor .= "\r\n
						" . $onclick . "
							";
				}

				$tempConstructor .= "
					}
				});
			})();";

				// The array with the toolbar buttons
				$btnsNames[] = $name;

				// The array with code for each button
				$tinyBtns[] = $tempConstructor;
			}
		}

		return array(
				'names'  => $btnsNames,
				'script' => $tinyBtns
		);
	}

	/**
	 * Get the global text filters to arbitrary text as per settings for current user groups
	 *
	 * @return  JFilterInput
	 *
	 * @since   3.6
	 */
	protected static function getGlobalFilters()
	{
		// Filter settings
		$config     = JComponentHelper::getParams('com_config');
		$user       = JFactory::getUser();
		$userGroups = JAccess::getGroupsByUser($user->get('id'));

		$filters = $config->get('filters');

		$blackListTags       = array();
		$blackListAttributes = array();

		$customListTags       = array();
		$customListAttributes = array();

		$whiteListTags       = array();
		$whiteListAttributes = array();

		$whiteList  = false;
		$blackList  = false;
		$customList = false;
		$unfiltered = false;

		// Cycle through each of the user groups the user is in.
		// Remember they are included in the public group as well.
		foreach ($userGroups as $groupId)
		{
			// May have added a group but not saved the filters.
			if (!isset($filters->$groupId))
			{
				continue;
			}

			// Each group the user is in could have different filtering properties.
			$filterData = $filters->$groupId;
			$filterType = strtoupper($filterData->filter_type);

			if ($filterType == 'NH')
			{
				// Maximum HTML filtering.
			}
			elseif ($filterType == 'NONE')
			{
				// No HTML filtering.
				$unfiltered = true;
			}
			else
			{
				// Blacklist or whitelist.
				// Preprocess the tags and attributes.
				$tags           = explode(',', $filterData->filter_tags);
				$attributes     = explode(',', $filterData->filter_attributes);
				$tempTags       = array();
				$tempAttributes = array();

				foreach ($tags as $tag)
				{
					$tag = trim($tag);

					if ($tag)
					{
						$tempTags[] = $tag;
					}
				}

				foreach ($attributes as $attribute)
				{
					$attribute = trim($attribute);

					if ($attribute)
					{
						$tempAttributes[] = $attribute;
					}
				}

				// Collect the blacklist or whitelist tags and attributes.
				// Each list is cummulative.
				if ($filterType == 'BL')
				{
					$blackList           = true;
					$blackListTags       = array_merge($blackListTags, $tempTags);
					$blackListAttributes = array_merge($blackListAttributes, $tempAttributes);
				}
				elseif ($filterType == 'CBL')
				{
					// Only set to true if Tags or Attributes were added
					if ($tempTags || $tempAttributes)
					{
						$customList           = true;
						$customListTags       = array_merge($customListTags, $tempTags);
						$customListAttributes = array_merge($customListAttributes, $tempAttributes);
					}
				}
				elseif ($filterType == 'WL')
				{
					$whiteList           = true;
					$whiteListTags       = array_merge($whiteListTags, $tempTags);
					$whiteListAttributes = array_merge($whiteListAttributes, $tempAttributes);
				}
			}
		}

		// Remove duplicates before processing (because the blacklist uses both sets of arrays).
		$blackListTags        = array_unique($blackListTags);
		$blackListAttributes  = array_unique($blackListAttributes);
		$customListTags       = array_unique($customListTags);
		$customListAttributes = array_unique($customListAttributes);
		$whiteListTags        = array_unique($whiteListTags);
		$whiteListAttributes  = array_unique($whiteListAttributes);

		// Unfiltered assumes first priority.
		if ($unfiltered)
		{
			// Dont apply filtering.
			return false;
		}
		else
		{
			// Custom blacklist precedes Default blacklist
			if ($customList)
			{
				$filter = JFilterInput::getInstance(array(), array(), 1, 1);

				// Override filter's default blacklist tags and attributes
				if ($customListTags)
				{
					$filter->tagBlacklist = $customListTags;
				}

				if ($customListAttributes)
				{
					$filter->attrBlacklist = $customListAttributes;
				}
			}
			// Blacklists take second precedence.
			elseif ($blackList)
			{
				// Remove the white-listed tags and attributes from the black-list.
				$blackListTags       = array_diff($blackListTags, $whiteListTags);
				$blackListAttributes = array_diff($blackListAttributes, $whiteListAttributes);

				$filter = JFilterInput::getInstance($blackListTags, $blackListAttributes, 1, 1);

				// Remove whitelisted tags from filter's default blacklist
				if ($whiteListTags)
				{
					$filter->tagBlacklist = array_diff($filter->tagBlacklist, $whiteListTags);
				}

				// Remove whitelisted attributes from filter's default blacklist
				if ($whiteListAttributes)
				{
					$filter->attrBlacklist = array_diff($filter->attrBlacklist, $whiteListAttributes);
				}
			}
			// Whitelists take third precedence.
			elseif ($whiteList)
			{
				// Turn off XSS auto clean
				$filter = JFilterInput::getInstance($whiteListTags, $whiteListAttributes, 0, 0, 0);
			}
			// No HTML takes last place.
			else
			{
				$filter = JFilterInput::getInstance();
			}

			return $filter;
		}
	}

	/**
	 * Return list of known TinyMCE buttons
	 *
	 * @return array
	 *
	 * @since __DEPLOY_VERSION__
	 */
	public static function getKnownButtons()
	{
		// See https://www.tinymce.com/docs/demo/full-featured/
		// And https://www.tinymce.com/docs/plugins/
		$buttons = array(

			// General buttons
			'|'              => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_SEPARATOR'), 'text' => '|'),

			'undo'           => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_UNDO')),
			'redo'           => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_REDO')),

			'bold'           => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_BOLD')),
			'italic'         => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ITALIC')),
			'underline'      => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_UNDERLINE')),
			'strikethrough'  => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_STRIKETHROUGH')),
			'styleselect'    => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_STYLESELECT'), 'text' => 'Formats'),
			'formatselect'   => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_FORMATSELECT'), 'text' => 'Paragraph'),
			'fontselect'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_FONTSELECT'), 'text' => 'Font'),
			'fontsizeselect' => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_FONTSIZESELECT'), 'text' => 'Fontsize'),

			'alignleft'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ALIGNLEFT')),
			'aligncenter'   => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ALIGNCENTER')),
			'alignright'    => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ALIGNRIGHT')),
			'alignjustify'  => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ALIGNJUSTIFY')),

			'outdent'       => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_OUTDENT')),
			'indent'        => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_INDENT')),

			'bullist'       => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_BULLIST')),
			'numlist'       => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_NUMLIST')),

			'link'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_LINK'), 'plugin' => 'link'),
			'unlink'        => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_UNLINK'), 'plugin' => 'link'),

			'subscript'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_SUBSCRIPT')),
			'superscript'   => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_SUPERSCRIPT')),
			'blockquote'    => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_BLOCKQUOTE')),

			'cut'           => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_CUT')),
			'copy'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_COPY')),
			'paste'         => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_PASTE'), 'plugin' => 'paste'),
			'pastetext'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_PASTETEXT'), 'plugin' => 'paste'),
			'removeformat'  => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_REMOVEFORMAT')),

			// Buttons from the plugins
			'forecolor'      => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_FORECOLOR'), 'plugin' => 'textcolor'),
			'backcolor'      => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_BACKCOLOR'), 'plugin' => 'textcolor'),
			'anchor'         => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_ANCHOR'), 'plugin' => 'anchor'),
			'hr'             => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_HR'), 'plugin' => 'hr'),
			'ltr'            => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_LTR'), 'plugin' => 'directionality'),
			'rtl'            => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_RTL'), 'plugin' => 'directionality'),
			'code'           => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_CODE'), 'plugin' => 'code'),
			'codesample'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_CODESAMPLE'), 'plugin' => 'codesample'),
			'table'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_TABLE'), 'plugin' => 'table'),
			'charmap'        => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_CHARMAP'), 'plugin' => 'charmap'),
			'visualchars'    => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_VISUALCHARS'), 'plugin' => 'visualchars'),
			'visualblocks'   => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_VISUALBLOCKS'), 'plugin' => 'visualblocks'),
			'nonbreaking'    => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_NONBREAKING'), 'plugin' => 'nonbreaking'),
			'emoticons'      => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_EMOTICONS'), 'plugin' => 'emoticons'),
			'image'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_IMAGE'), 'plugin' => 'image'),
			'media'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_MEDIA'), 'plugin' => 'media'),
			'pagebreak'      => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_PAGEBREAK'), 'plugin' => 'pagebreak'),
			'print'          => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_PRINT'), 'plugin' => 'print'),
			'preview'        => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_PREVIEW'), 'plugin' => 'preview'),
			'fullscreen'     => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_FULLSCREEN'), 'plugin' => 'fullscreen'),
			'template'       => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_TEMPLATE'), 'plugin' => 'template'),
			'searchreplace'  => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_SEARCHREPLACE'), 'plugin' => 'searchreplace'),
			'insertdatetime' => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_INSERTDATETIME'), 'plugin' => 'insertdatetime'),
			// 'spellchecker'   => array('label' => JText::_('PLG_TINY_TOOLBAR_BUTTON_SPELLCHECKER'), 'plugin' => 'spellchecker'),
		);

		return $buttons;
	}

	/**
	 * Return toolbar presets
	 *
	 * @return array
	 *
	 * @since __DEPLOY_VERSION__
	 */
	public static function getToolbarPreset()
	{
		$preset = array();

		$preset['simple'] = array(
			'menu' => array(),
			'toolbar1' => array(
				'bold', 'underline', 'strikethrough', '|',
				'undo', 'redo', '|',
				'bullist', 'numlist', '|',
				'pastetext'
			),
			'toolbar2' => array(),
		);

		$preset['medium'] = array(
			'menu' => array('edit', 'insert', 'view', 'format', 'table', 'tools'),
			'toolbar1' => array(
				'bold', 'italic', 'underline', 'strikethrough', '|',
				'alignleft', 'aligncenter', 'alignright', 'alignjustify', '|',
				'formatselect', '|',
				'bullist', 'numlist', '|',
				'outdent', 'indent', '|',
				'undo', 'redo', '|',
				'link', 'unlink', 'anchor', 'code', '|',
				'hr', 'table', '|',
				'subscript', 'superscript', '|',
				'charmap', 'pastetext' , 'preview'
			),
			'toolbar2' => array(),
		);

		$preset['advanced'] = array(
			'menu'     => array('edit', 'insert', 'view', 'format', 'table', 'tools'),
			'toolbar1' => array(
				'bold', 'italic', 'underline', 'strikethrough', '|',
				'alignleft', 'aligncenter', 'alignright', 'alignjustify', '|',
				'styleselect', '|',
				'formatselect', 'fontselect', 'fontsizeselect', '|',
				'searchreplace', '|',
				'bullist', 'numlist', '|',
				'outdent', 'indent', '|',
				'undo', 'redo', '|',
				'link', 'unlink', 'anchor', 'image', '|',
				'code', '|',
				'forecolor', 'backcolor', '|',
				'fullscreen', '|',
				'table', '|',
				'subscript', 'superscript', '|',
				'charmap', 'emoticons', 'media', 'hr', 'ltr', 'rtl', '|',
				'cut', 'copy', 'paste', 'pastetext', '|',
				'visualchars', 'visualblocks', 'nonbreaking', 'blockquote', 'template', '|',
				'print', 'preview', 'codesample', 'insertdatetime', 'removeformat',
			),
			'toolbar2' => array(),
		);

		return $preset;
	}
}
