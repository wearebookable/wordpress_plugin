<?php

/**
 * @link              https://github.com/wearebookable/wordpress_plugin
 * 
 * Plugin Name:       Bookable Schedule Widget
 * Description:       A widget for displaying a schedule of events created using Bookable, https://wearebookable.com.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            We Are Bookable Ltd.
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       bookable-schedule-widget
 *
 * @package Bookable
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define('BOOKABLE_SCHEDULE_WIDGET_VERSION', '0.1.1');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function bookable_schedule_widget_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'bookable_schedule_widget_block_init');
