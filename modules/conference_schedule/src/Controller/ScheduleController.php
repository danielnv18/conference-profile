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
    return [
      '#type' => 'markup',
      '#attached' => [
        'library' => ['conference_schedule/scheduler']
      ],
      '#markup' => '<div id="conference-schedule-dashboard"></div>',
    ];
  }

}
