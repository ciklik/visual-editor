import {
  FieldComponent,
  FieldCondition,
  FieldDefinition,
  FieldFactory,
  FieldGroupComponent,
  FieldGroupFactory,
} from 'src/types'
import { cast } from 'src/functions/object'

type FieldOption = Record<string, any>

/**
 * Helpers to ease the creation of new field type
 */

export function defineField<Options extends FieldOption, Value>(args: {defaultOptions: Options, render: FieldComponent<Options, Value>}): FieldFactory<Options, Value>
{
  return (name: string, options = {} as Options) => {
    return {
      ...genericFieldDefinition(args, options),
      ...args,
      options: {...args.defaultOptions, ...options},
      name,
      group: false as const,
      // Inject CSS variables for the component using the "variables" options
      // For instance variables: {background: 'backgroundColor'} will look for a 'backgroundColor' field for the current component
      // and will create a `--ve-field-background: <backgroundColor Value>` property
      injectStyle (data: Record<string, any>): Record<string, string> | null {
        if (this.options.variables) {
          const variables = this.options.variables as Record<string, string>
          return Object.keys(variables).reduce((acc, key) => {
            const value = data[variables![key]!]
            if (value) {
              return { ...acc, [`--ve-field-${key}`]: `var(${value})` }
            }
            return acc
          }, {})
        }
        return null
      }
    }
  }
}


export function defineFieldGroup<Options extends FieldOption>(args: {defaultOptions: Options, render: FieldGroupComponent<Options>}): FieldGroupFactory<Options>
{
  return (fields: FieldDefinition<any, any>[], options: Options = {} as Options) => {
    return {
      ...genericFieldDefinition(args, options),
      group: true as const,
      fields: fields,
      render: args.render
    }
  }
}

export function defaultFieldProperties () {
  return {
    conditions: [] as FieldCondition[],
    shouldRender(data: Record<string, any>) {
      return this.conditions.filter((condition) => !condition(data)).length === 0
    },
    when (fieldName: string, expectedValue: any = true) {
      return {
        ...this,
        conditions: [
          ...this.conditions,
          (data: Record<string, any>) => {
            if (typeof expectedValue === 'function') {
              return expectedValue(data[fieldName])
            }
            return cast(data[fieldName], expectedValue) === expectedValue
          }
        ]
      } as any
    }
  }
}

function genericFieldDefinition<Options extends FieldOption> (args: {defaultOptions?: Options}, options: Options) {
  return {
    options: {...args.defaultOptions, ...options},
    ...defaultFieldProperties()
  }
}
