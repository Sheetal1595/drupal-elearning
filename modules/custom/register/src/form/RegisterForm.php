<?php
    namespace Drupal\register\Form;

    use Drupal\Core\Form\FormBase;
    use Drupal\Core\Form\FormStateInterface;
    use Drupal\Core\Database\Database;
    use Drupal\Core\Url;
    use Drupal\Core\Routing;
    use Drupal\redirect\Entity\Redirect;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    
    class RegisterForm extends FormBase {
         /**
         * {@inheritdoc}
         */
        public function getFormId() {
            return 'register_form';
        }

        
        /**
         * {@inheritdoc}
         */
        public function buildForm(array $form, FormStateInterface $form_state) {
            $form['name'] = [
            '#type' => 'textfield',
            '#title' => $this->t('Enter Username'),
            '#required' => TRUE,
            '#attributes' => array(
                'class' => 'form-control col-md-12',
                'id' => 'user_title',
            ),
            ];

            $form['email'] = [
                '#type' => 'email',
                '#title' => $this->t('Enter Email address'),
                '#required' => TRUE,
                '#attributes' => array(
                    'class' => 'form-control col-md-6',
                    'id' => 'user_email',
                ),
                ];

            $form['password'] = [
                '#type' => 'password',
                '#title' => $this->t('Enter Your Password'),
                '#required' => TRUE,
                '#attributes' => array(
                    'class' => 'form-control col-md-6',
                    'id' => 'user_password',
                ),
            ];


            $value1 = array('User' => t('User'),
            'Trainer' => t('Trainer'));
            

            // $form['role'] = [
            // '#type' => 'select',
            // '#title' => $this->t('Role'),
            // '#required' => TRUE,
            // '#attributes' => array(
            //     'class' => 'form-control col-md-6',
            //     'id' => 'user_role',
            // ),
            // '#options' => $value1
            // ];

            
            $result = \Drupal::database()

                    ->select('node_field_data', 'n')

                    ->fields('n', array('nid', 'title'))

                    ->condition('type','course','=')

                    ->execute()->fetchAllAssoc('nid');
                    $rows = array();
                    $courses=array();
                foreach ($result as $row => $content) {
                    $rows[] = array($content->title => t($content->title));

                    // echo $content->title;

                    $courses[$content->title] = $content->title ;

                    echo "<br>";

                }
            
            
            $form['course'] = [
                '#type' => 'select',
                '#title' => $this->t('Course'),
                '#required' => TRUE,
                '#multiple' => TRUE,
                '#attributes' => array(
                    'class' => 'form-control col-md-6',
                    'id' => 'user_course',
                ),
                '#options' => $courses
            ];

           

            

            $form['actions']['#type'] = 'actions';



            $form['actions']['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Save'),
            '#button_type' => 'primary',
        
            ];
            return $form;
        }


       
        /**
         * {@inheritdoc}
         */
        public function submitForm(array &$form, FormStateInterface $form_state) {

            $name = $form_state->getValue('name');
            $email = $form_state->getValue('email');
            $password=$form_state->getValue('password');
            $password =  md5($password);
            $role = $form_state->getValue('role');
            $course = $form_state->getValue('course');
            
            // print_r(gettype($course));die;
           
            $query=\Drupal::database();
            $query->insert('register_form') -> fields(array(
                'name'=>$name,
                'email'=>$email,
                'password'=>$password,
                // 'role'=>$role,
                // 'course'=>$course,
                

            ))->execute();

            $query=\Drupal::database();

            $query = $query->select('register_form');
            $query->addExpression('LAST_INSERT_ID()', 'id');

            $result = $query->execute()->fetch();
            
            $last_id= $result->id;
            
             
            foreach($course as $course1)
            {
                   
                $result1= \Drupal::database()

                    ->select('node_field_data', 'n')
        
                    ->fields('n', array('vid', 'title'))
        
                    ->condition('title',$course1,'=')
        
                    ->execute()->fetchAll(\PDO::FETCH_OBJ);
                    
                    foreach ($result1 as $row => $content) {
                        $vid = $content->vid;

                        $result2 = \Drupal::database()

                        ->select('node_revision__field_assesment', 'n')
        
                        ->fields('n', array('revision_id', 'field_assesment_uri'))
        
                        ->condition('revision_id',$vid,'=')
        
                        ->execute()->fetchAll(\PDO::FETCH_OBJ); 
        
                        foreach ($result2 as $row => $content2) {
                            $a_url = $content2->field_assesment_uri;
        

                            $query1=\Drupal::database();
                            $query1->insert('register_assesment') -> fields(array(
                                'cname'=>$course1,
                                'reg_id'=>$vid,
                                'fk_user_id' => $last_id,
                                'assesment'=>$a_url,
                                'name'=>$name,
                            ))->execute();
                          
                        } 
                    }
            }




            $response = new RedirectResponse('login/');  
            //$response = new RedirectResponse('myprofile');
            $response->send();
            //Give status of form data value
            \Drupal::messenger()->addMessage('Registered Successfully ');
            // $this->messenger()->addStatus($this->t('Username  is @name', ['@title' => $form_state->getValue('name')]));
            // $this->messenger()->addStatus($this->t('Your email address  is @email', ['@email' => $form_state->getValue('email')]));
            // $this->messenger()->addStatus($this->t('Your selected course  is @course', ['@course' => $form_state->getValue('course')]));
        }
    }
?>