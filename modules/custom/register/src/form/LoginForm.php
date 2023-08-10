<?php
    namespace Drupal\register\Form;

    use Drupal\Core\Form\FormBase;
    use Drupal\Core\Form\FormStateInterface;
    use Drupal\Core\Database\Database;
    use Drupal\Core\Url;
    use Drupal\Core\Routing;
    use Drupal\redirect\Entity\Redirect;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Drupal\user\PrivateTempStoreFactory;
    
    class LoginForm extends FormBase {
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

            
            $form['help'] = [
            '#type' => 'item',
            '#markup' => t('<h2 style="color: #fd5f00 !important;;text-align:center">Login Form</h2> <h4 style="color: #fd5f00 !important;;text-align:center">For new user click on <a href="register">Register Here</a></h4>'),
            'class' => 'form-control col-md-12',
            ];


            $form['email'] = [
                '#type' => 'email',
                '#title' => $this->t('Enter Email address'),
                '#required' => TRUE,
                '#attributes' => array(
                    'class' => 'form-control col-md-4',
                    'id' => 'user_email',
                ),
                ];

            $form['password'] = [
                '#type' => 'password',
                '#title' => $this->t('Enter Your Password'),
                '#required' => TRUE,
                '#attributes' => array(
                    'class' => 'form-control col-md-4',
                    'id' => 'user_password',
                ),
            ];


            $form['actions']['#type'] = 'actions';



            $form['actions']['submit'] = [
            '#type' => 'submit',
            '#value' => $this->t('Login'),
            '#button_type' => 'primary',
            '#class' => 'form-control col-md-4',
            '#id' => "login_submit"
        
            ];
            return $form;
        }


       
        /**
         * {@inheritdoc}
         */
        public function submitForm(array &$form, FormStateInterface $form_state) {

           
            $email = $form_state->getValue('email');
            $password=$form_state->getValue('password');
            $password =  md5($password);
           

            //Select form value in table
            $result = \Drupal::database()

                    ->select('register_form', 'n')

                    ->fields('n', array('id', 'name', 'email', 'password'))

                    ->condition('email',$email,'=')

                    ->condition('password',$password,'=')

                    ->execute()->fetchAllAssoc('id');
                    $rows = array();
                    if ($result){
               
                        foreach ($result as $row => $content) {
                            $rows[] = array($content->name => t($content->id));
        
                            echo $name= $content->name;
                            $id=$content->id;
        
                            $courses[$content->title] = $content->title ;
        
                            echo "<br>";
        
                        }
    
                   
                        $response = new RedirectResponse('userprofile/'.$content->id.'/'.$name);  
                        //$response = new RedirectResponse('myprofile');
                        $response->send();
                    }
                    else
                    {
                        $email = $form_state->getValue('email');
                        $password=$form_state->getValue('password');
                    //     // $password =  md5($password);
                    //     //Select form value in table
                    
                        $database = \Drupal::database();
                        $query = $database->query("SELECT * FROM {users_field_data} where mail='$email'");
                    
                        // ->condition('pass',$password,'=');

                        $result = $query->fetchAll();
                   
                        foreach($result as $row)
                        {
                            echo "<pre>";
                            print_r($row);
                            echo "</pre>";
                            $name = $row->name;

                            //  echo $row->name;die;
                            
                            $response = new RedirectResponse('trainerprofile/'.$row->uid.'/'.$row->name);  
                            $response->send();

                        }
                    }
    
                    
        }
    }
?>