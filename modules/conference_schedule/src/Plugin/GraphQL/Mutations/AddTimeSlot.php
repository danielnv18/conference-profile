<?php

namespace Drupal\conference_schedule\Plugin\GraphQL\Mutations;

use Drupal\graphql\Annotation\GraphQLMutation;
use Drupal\graphql\GraphQL\Execution\ResolveContext;
use Drupal\graphql_core\Plugin\GraphQL\Mutations\Entity\CreateEntityBase;
use GraphQL\Type\Definition\ResolveInfo;

/**
 * Class CreateArticle
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

  protected function extractEntityInput(
    $value,
    array $args,
    ResolveContext $context,
    ResolveInfo $info
  ) {
    $x = 1;
  }
}
