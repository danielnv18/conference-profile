<?php

namespace Drupal\conference_schedule\Plugin\GraphQL\Mutations;

use Drupal\graphql\Annotation\GraphQLMutation;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\CreateEntityBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Class CreateTimeSlot
 *
 * @package Drupal\conference_schedule\Plugin\GraphQL\Mutations
 *
 * @GraphQLMutation(
 *   id="add_time_slot",
 *   entity_type="taxonomy_term",
 *   entity_bundle="time_slot",
 *   name="addTimeSlot",
 *   type="EntityCrudOutput!",
 *   arguments={"input"="TimeSlutInput"}
 * )
 */
class AddTimeSlot extends CreateEntityBase {

  protected function extractEntityInput($value, array $args, ResolveContext $context, ResolveInfo $info) {
    $timezone = new \DateTimeZone(drupal_get_user_timezone());
    $start_date = new \DateTime($args['input']['startDate'], $timezone);
    $end_date = new \DateTime($args['input']['endDate'], $timezone);
    $name = $start_date->format('d F') . '-' .$start_date->format('H:i:s') . '/'.$end_date->format('H:i:s');

    // Drupal expect the time in UTC timezone.
    $utc = new \DateTimeZone('UTC');
    $start_date->setTimezone($utc);
    $end_date->setTimezone($utc);

    return [
      'name' => $name,
      'field_date_range' => [
        'value' => $start_date->format('Y-m-d\TH:i:s'),
        'end_value' => $end_date->format('Y-m-d\TH:i:s'),
      ]
    ];
  }
}
