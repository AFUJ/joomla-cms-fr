<?php
/**
 * @package     Joomla.Site
 * @subpackage  com_tags
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Routing class from com_tags
 *
 * @package     Joomla.Site
 * @subpackage  com_tags
 * @since       3.3
 */
class TagsRouter extends JComponentRouterBase
{
	/**
	 * Build the route for the com_tags component
	 *
	 * @param   array  &$query  An array of URL arguments
	 *
	 * @return  array  The URL arguments to use to assemble the subsequent URL.
	 *
	 * @since   3.3
	 */
	public function build(&$query)
	{
		$segments = array();

		// Get a menu item based on Itemid or currently active
		$app		= JFactory::getApplication();
		$menu		= $app->getMenu();
		$params		= JComponentHelper::getParams('com_tags');
		$advanced	= $params->get('sef_advanced_link', 0);

		// We need a menu item.  Either the one specified in the query, or the current active one if none specified
		if (empty($query['Itemid']))
		{
			$menuItem = $menu->getActive();
		}
		else
		{
			$menuItem = $menu->getItem($query['Itemid']);
		}

		$mView = (empty($menuItem->query['view'])) ? null : $menuItem->query['view'];
		$mId   = (empty($menuItem->query['id'])) ? null : $menuItem->query['id'];

		if (is_array($mId))
		{
			JArrayHelper::toInteger($mId);
		}

		if (isset($query['view']))
		{
			$view = $query['view'];

			if (empty($query['Itemid']))
			{
				$segments[] = $query['view'];
			}

			unset($query['view']);
		}

		// Are we dealing with a tag that is attached to a menu item?
		if (isset($view) && ($mView == $view) and (isset($query['id'])) and ($mId == $query['id']))
		{
			unset($query['view']);
			unset($query['id']);
			return $segments;
		}

		if (isset($view) and $view == 'tag')
		{
			if ($mId != (int) $query['id'] || $mView != $view)
			{
				if ($view == 'tag')
				{
					if ($advanced)
					{
						list($tmp, $id) = explode(':', $query['id'], 2);
					}
					else
					{
						$id = $query['id'];
					}

					$segments[] = $id;
				}
			}

			unset($query['id']);
		}

		if (isset($query['layout']))
		{
			if (!empty($query['Itemid']) && isset($menuItem->query['layout']))
			{
				if ($query['layout'] == $menuItem->query['layout'])
				{
					unset($query['layout']);
				}
			}
			else
			{
				if ($query['layout'] == 'default')
				{
					unset($query['layout']);
				}
			}
		};

		$total = count($segments);

		for ($i = 0; $i < $total; $i++)
		{
			$segments[$i] = str_replace(':', '-', $segments[$i]);
		}

		return $segments;
	}

	/**
	 * Parse the segments of a URL.
	 *
	 * @param   array  &$segments  The segments of the URL to parse.
	 *
	 * @return  array  The URL attributes to be used by the application.
	 *
	 * @since   3.3
	 */
	public function parse(&$segments)
	{
		$total = count($segments);
		$vars = array();

		for ($i = 0; $i < $total; $i++)
		{
			$segments[$i] = preg_replace('/-/', ':', $segments[$i], 1);
		}

		// Get the active menu item.
		$app	= JFactory::getApplication();
		$menu	= $app->getMenu();
		$item	= $menu->getActive();

		// Count route segments
		$count = count($segments);

		// Standard routing for tags.
		if (!isset($item))
		{
			$vars['view']	= $segments[0];
			$vars['id']		= $segments[$count - 1];

			return $vars;
		}

		// From the tags view, we can only jump to a tag.
		$id = (isset($item->query['id']) && $item->query['id'] > 1) ? $item->query['id'] : 'root';

		$found = 0;

		/*
		 * TODO: Sort this code out. Makes no sense!
		 * $found isn't used.
		 * The foreach loop will always break in first itteration
		 */
		foreach ($segments as $segment)
		{
			if ($found == 0)
			{
				$id = $segment;
			}

			$vars['id'] = $id;
			$vars['view'] = 'tag';

			break;
		}

		$found = 0;

		return $vars;
	}
}

/**
 * Tags router functions
 *
 * These functions are proxys for the new router interface
 * for old SEF extensions.
 *
 * @deprecated  4.0  Use Class based routers instead
 */
function TagsBuildRoute(&$query)
{
	$router = new TagsRouter;

	return $router->build($query);
}

function TagsParseRoute($segments)
{
	$router = new TagsRouter;

	return $router->parse($segments);
}
