<?php

namespace Drupal\conference_schedule\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Annotation\GraphQLInputType;
use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * The input type for article mutations.
 *
 * @GraphQLInputType(
 *   id = "time_slot_input",
 *   name = "TimeSlotInput",
 *   fields = {
 *     "startDate" = {
 *        "type" = "String",
 *        "nullable" = "FALSE"
 *     },
 *     "endDate" = {
 *        "type" = "String",
 *        "nullable" = "FALSE"
 *     },
 *   }
 * )
 */
class TimeSlotInput extends InputTypePluginBase {
}
