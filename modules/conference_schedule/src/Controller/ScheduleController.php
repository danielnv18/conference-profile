<?php

namespace Drupal\conference_schedule\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class ScheduleController.
 */
class ScheduleController extends ControllerBase {

  /**
   * Dashboard.
   *
   * @return array
   *   Return Hello string.
   */
  public function dashboard() {
    $config = $this->config('conference_schedule.config');
    return [
      '#type' => 'markup',
      '#attached' => [
        'library' => ['conference_schedule/scheduler'],
        'drupalSettings' => [
          'conference' => [
            'startDate' => $config->get('start'),
            'endDate' => $config->get('end')
          ]
        ]
      ],
      '#markup' => '<div id="conference-schedule-dashboard"></div>',
    ];
  }

}
