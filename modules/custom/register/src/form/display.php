<?php
/**
 * @file
 * Contains \Drupal\my_custom\Controller\Display.
 */

namespace Drupal\book\Form;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Database;
// use Drupal\Core\Link;
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

    $result = \Drupal::database()->select('enquiry_form', 'n')
            ->fields('n', array('id', 'title', 'description', 'email', 'city', 'zipcode'))
            ->execute()->fetchAllAssoc('id');
// Create the row element.
    $rows = array();
    foreach ($result as $row => $content) {
        // $delete = Url::fromUserInput('/book/form/delete/'.$content->id);
        // $edit   = Url::fromUserInput('/book/form/edit?num='.$content->id);
    //   $rows[] = array(
    //     'data' => array($content->id, $content->title, $content->description, $content->email, $content->city, $content->zipcode,\Drupal::l ('Delete', $delete),
    //              ));
        $rows[] = array(
            'data' => array($content->id, $content->title, $content->description, $content->email, $content->city, $content->zipcode
                    ));
    }
// Create the header.
    
    $header = array('ID', 'Title', 'Description','Email','City','Zipcode');
    $output = array(
      '#theme' => 'table',    // Here you can write #type also instead of #theme.
      '#header' => $header,
      '#rows' => $rows
    );
    
    return $output;
  }
}