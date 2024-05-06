# Laravel Nova Inline Badge Field

This package adds inline editing for the badge field in index, detail and form.

## Requirements

- `laravel/nova: ^4.0`


## Installation

```bash
composer require wamesk/laravel-nova-inline-badge-field
```

## Usage

The usage is exactly the same as the default Badge field in Laravel Nova 4

[https://nova.laravel.com/docs/resources/fields.html#badge-field](https://nova.laravel.com/docs/resources/fields.html#badge-field)

```php
use Wame\LaravelNovaInlineBadgeField\Fields\InlineBadge;

InlineBadge::make('Status')->map([
        'draft' => 'danger',
        'published' => 'success',
    ])->labels([
        'draft' => 'Draft',
        'published' => 'Published',
    ]),
```

Added additional method for setting `styles()`, e.g. to set a specific background color from database

```php
    ->styles([
        'draft' => 'background-color: #ff0000;',
        'published' => 'background-color: #008000;',
    ])
```

## Validation caveats
In the case where fields on a model are required, which is likely, an extra step needs to be taken to ensure the inline select update persists and doesn't throw an error. The validation rule sometimes needs to be added to the updateRules() method on any field that is required.

```php
BelongsTo::make(__('order.field.company'), 'company', Company::class)
    ->required()
    ->rules('required')
    ->updateRules('sometimes')
```

## Authorization

If the user does not have the permission to edit the resource, nothing will happen after clicking.
