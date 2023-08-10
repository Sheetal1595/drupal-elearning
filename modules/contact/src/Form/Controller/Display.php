<?php
/**
 * @file
 * Contains \Drupal\my_custom\Controller\Display.
 */

namespace Drupal\contact\Form\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;

/**
 * Class Display.
 *
 * @package Drupal\my_custom\Controller
 */
class Display extends ControllerBase {

  /**
   * showdata.
   *
   * @return string
   *   Return Table format data.
   */
  public function showdata() {

// you can write your own query to fetch the data I have given my example.

    $result = \Drupal::database()->select('contact_us', 'n')
            ->fields('n', array('id', 'name', 'email','mobile','subject','message'))
            ->execute()->fetchAllAssoc('id');
// Create the row element.
    $rows = array();
    foreach ($result as $row => $content) {
      $rows[] = array(
        'data' => array($content->id, $content->name, $content->email,$content->mobile,$content->subject,$content->message));
    }
// Create the header.
    $header = array('id', 'name', 'email','mobile','subject','message');
    $output = array(
      '#theme' => 'table',    // Here you can write #type also instead of #theme.
      '#header' => $header,
      '#rows' => $rows
    );
    return $output;
  }
}
