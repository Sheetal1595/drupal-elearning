<?php
    
    namespace Drupal\register\Controller;
    use Drupal\Core\Controller\ControllerBase;
   
    use Drupal\Core\Routing;

    class RegisterController extends ControllerBase
    {
        public function userprofile($id)
        {
            $id = \Drupal::routeMatch()->getParameter('id');

            
            $query = \Drupal::database();
            $result1 = $query->select('register_form' , 'u')  
                ->condition('id' , $id)
                ->fields('u',['id', 'name', 'email'])  
                ->execute()->fetchAll(\PDO::FETCH_OBJ);  
            foreach ($result1 as $row => $content) {
                 $id = $content->id;

            //  echo $id;

            }
                
            $result= \Drupal::database()

                ->select('register_assesment', 'n')

                ->fields('n', array('id','cname', 'assesment'))

                ->condition('fk_user_id',$id,'=')

                ->execute()->fetchAll(\PDO::FETCH_OBJ); 

                foreach ($result as $row => $content) {
                    $assesment = $content->assesment;
                    // echo $assesment;
                    // echo "<br>";

                }

          

             //exit();   
                echo "<pre>";
               $result3=array_merge($result1,$result);

                // print_r($result1);
                // print_r($result);

                // print_r($result3);
                // exit();

            return [
                '#theme' => 'userprofilepage',
                '#items' => $result1,
                '#data' => $result,
            ];
        }

        public function trainerprofile($id,$t_name)
        {
            // echo "hi";

            $uid = \Drupal::routeMatch()->getParameter('id');
            
            $t_name = \Drupal::routeMatch()->getParameter('t_name');
          


            $query = \Drupal::database()
                    ->select('node__field_trainer', 'n')

                    ->fields('n',['entity_id', 'field_trainer_target_id']) 

                    ->condition('field_trainer_target_id',$uid)
                
                     ->execute()->fetchAll(\PDO::FETCH_OBJ); 

                     $c_name=array();
            foreach ($query as $row => $content) {
                

                // echo "agdhsfn i";
                $c_id = $content->entity_id;
                echo $name = $content->name;
//  print_r($c_name);
//             die;
                $query = \Drupal::database()
                    ->select('node_field_data', 'n')

                    ->fields('n',['nid', 'title']) 

                    ->condition('nid',$c_id)
                
                     ->execute()->fetchAll(\PDO::FETCH_OBJ); 
                     foreach ($query as $row => $content) {
                

                        // echo "agdhsfn i";
                        $c_name[] = $content->title;
                        
                     }

            }
            

           
            

            return [
                '#theme' => 'trainerprofilepage',
                '#items' => $c_name,
            ];
           
        }

        public function usercourse($id,$title)
        {
            $id = \Drupal::routeMatch()->getParameter('id');
            $title = \Drupal::routeMatch()->getParameter('title');
            
            $result = \Drupal::database()

                ->select('node_field_data', 'n')

                ->fields('n', array('nid', 'title'))

                ->condition('title',$title,'=')

                ->execute()->fetchAll(\PDO::FETCH_OBJ); 

                foreach ($result as $row => $content) {
                    echo $c_id = $content->nid;

                    echo "<br>";

                }

                $result1 = \Drupal::database()

                ->select('node_revision__field_assesment', 'n')

                ->fields('n', array('entity_id', 'field_assesment_uri'))

                ->condition('entity_id',$c_id,'=')

                ->execute()->fetchAll(\PDO::FETCH_OBJ); 

                foreach ($result1 as $row => $content1) {
                    echo $a_url = $content1->field_assesment_uri;

                    echo "<br>";

                }

                // die();
            
                
                return [
                    '#theme' => 'usercoursepage',
                    '#items' => $result,
                ];

        }

        
        public function showdata($name) {

        // you can write your own query to fetch the data I have given my example.
            $name = \Drupal::routeMatch()->getParameter('name');
            $result = \Drupal::database()->select('register_assesment', 'n')
            ->fields('n', array('id', 'name','cname'))
            ->condition('cname',$name,'=')
            ->execute()->fetchAllAssoc('id');

            $rows = array();
            $i=1;
            foreach ($result as $row => $content) {
            $rows[] = array(
            'data' => array($i++, $content->cname,$content->name));
            }


            $header = array('Id', 'course','name');
            $output = array(
            '#theme' => 'table', 
            '#header' => $header,
            '#rows' => $rows
            );

            return $output;
            }


       
    }
?>