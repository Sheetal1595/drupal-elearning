<?php
    namespace Drupal\contact\Form;

    use Drupal\Core\Form\FormBase;
    use Drupal\Core\Form\FormStateInterface;
    
    class ContactForm extends FormBase {
         /**
         * {@inheritdoc}
         */
        public function getFormId() {
            return 'contact_form';
        }

        /**
         * {@inheritdoc}
         */
        public function buildForm(array $form, FormStateInterface $form_state) {
            $form['name'] = [
            '#type' => 'textfield',
            '#title' => $this->t('Your Name'),
            '#required' => TRUE,
            ];

            $form['email'] = [
                '#type' => 'email',
                '#title' => $this->t('Your Email Address'),
                '#required' => TRUE,
            ];

            $form['mobile'] = [
            '#type' => 'tel',
            '#title' => $this->t('Your phone number'),
            '#required' => TRUE,
            ];

            $form['subject'] = [
                '#type' => 'textfield',
                '#title' => $this->t('Subject'),
                '#required' => TRUE,
                ];

            $form['message'] = [
                    '#type' => 'textfield',
                    '#title' => $this->t(' Message'),
                    '#required' => TRUE,
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
    public function validateForm(array &$form, FormStateInterface $form_state) {
        if (strlen($form_state->getValue('mobile')) < 3) {
        $form_state->setErrorByName('mobile', $this->t('The phone number is too short. Please enter a full phone number.'));
        }
    }
        /**
         * {@inheritdoc}
         */
        public function submitForm(array &$form, FormStateInterface $form_state) {

            $name = $form_state->getValue('name');
            $email = $form_state->getValue('email');
            $number = $form_state->getValue('mobile');
            $subject = $form_state->getValue('subject');
            $message = $form_state->getValue('message');

            //Insert form value in table
            $query=\Drupal::database();
            $query->insert('contact_us') -> fields(array(
                'name'=>$name,
                'email'=>$email,
                'mobile'=>$number,
                'subject'=>$subject,
                'message'=>$message

            ))->execute();


            //Give status of form data value
            // \Drupal::messenger()->addMessage('Data Saved ');
            // $this->messenger()->addStatus($this->t('Your name  is @name', ['@name' => $form_state->getValue('name')]));
            // $this->messenger()->addStatus($this->t('Your email address  is @email', ['@email' => $form_state->getValue('email')]));
            // $this->messenger()->addStatus($this->t('Your Contact number  is @mobile', ['@mobile' => $form_state->getValue('mobile')]));
        }


    }
?>


