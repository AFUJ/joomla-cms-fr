<?php
/**
 * @package     Joomla.Platform
 * @subpackage  Image
 *
 * @copyright   (C) 2020 Open Source Matters, Inc. <https://www.joomla.org>
 * @license     GNU General Public License version 2 or later; see LICENSE
 */

namespace Joomla\CMS\Image\Exception;

\defined('JPATH_PLATFORM') or die;

/**
 * Exception thrown when an image has no known properties.
 *
 * @since  4.0.0
 */
class UnparsableImageException extends \RuntimeException
{
}
