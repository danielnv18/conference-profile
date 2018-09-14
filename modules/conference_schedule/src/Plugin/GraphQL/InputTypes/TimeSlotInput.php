<?php

namespace Drupal\conference_schedule\Plugin\GraphQL\InputTypes;

use Drupal\graphql\Annotation\GraphQLInputType;
use Drupal\graphql\Plugin\GraphQL\InputTypes\InputTypePluginBase;

/**
 * The input type for article mutations.
 *
 * @GraphQLInputType(
 *   id = "time_slot_input",
 *   name = "TimeSlutInput",
 *   fields = {
 *     "date_start" = {
 *        "type" = "String",
 *        "nullable" = "FALSE"
 *     },
 *     "date_end" = {
 *        "type" = "String",
 *        "nullable" = "FALSE"
 *     },
 *   }
 * )
 */
class TimeSlotInput extends InputTypePluginBase {
}
