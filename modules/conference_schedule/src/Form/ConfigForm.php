<?php

namespace Drupal\conference_schedule\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class ConfigForm.
 */
class ConfigForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'conference_schedule.config',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'config_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('conference_schedule.config');
    $start_date = $config->get('start');
    $end_date = $config->get('end');
    $form['start'] = [
      '#type' => 'date',
      '#title' => $this->t('Start date'),
      '#default_value' => $start_date,
    ];
    $form['end'] = [
      '#type' => 'date',
      '#title' => $this->t('End date'),
      '#default_value' => $end_date,
    ];

    if (!empty($start_date) && !empty($end_date)) {
      $period = new \DatePeriod(
        new \DateTime($start_date),
        new \DateInterval('P1D'),
        new \DateTime($end_date)
      );
      $form += $this->buildSchedule($period);
    }

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $start_date = new \DateTime($form_state->getValue('start'));
    $end_date = new \DateTime($form_state->getValue('end'));

    if ($start_date > $end_date) {
      $form_state->setError($form['start'], t('The end cannot be in the past'));
    }

    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('conference_schedule.config')
      ->set('start', $form_state->getValue('start'))
      ->set('end', $form_state->getValue('end'))
      ->save();
  }

  /**
   * @param \DatePeriod $period
   *
   * @return array
   */
  protected function buildSchedule(\DatePeriod $period):array {
    $form = [];

    $form['schedule'] = [
      '#type' => 'vertical_tabs',
    ];

    /** @var \DateTime $date */
    foreach ($period as $date) {
      $date_format = $date->format('Y-m-d');
      $form[$date_format] = array(
        '#type' => 'details',
        '#title' => $date->format('D, m/d/Y'),
        '#group' => 'schedule',
      );
      $form[$date_format]['name'] = [
        '#type' => 'textfield',
        '#title' => $this->t('Name'),
      ];

      $form[$date_format]['actions']['add_time_slot'] = [
        '#type' => 'submit',
        '#value' => t('Add time slot'),
        '#submit' => array('::addOne'),
        '#ajax' => [
          'callback' => '::addTimeSlot',
          'wrapper' => $date_format . '-fieldset-wrapper',
        ],
      ];
    }

    return $form;
  }

  public function addTimeSlot(array &$form, FormStateInterface $form_state) {
    $name_field = $form_state->get('num_names');
    return $form['names_fieldset'];
  }

}
