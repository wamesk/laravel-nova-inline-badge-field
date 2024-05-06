<?php

namespace Wame\LaravelNovaInlineBadgeField\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;

class LaravelNovaInlineBadgeFieldServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        Nova::serving(function (ServingNova $event): void {
            Nova::style('wame-inline-badge', __DIR__ . '/../../dist/css/field.css');
            Nova::script('wame-inline-badge', __DIR__ . '/../../dist/js/field.js');
            Nova::translations(__DIR__ . '/../../resources/lang/' . app()->getLocale() . '.json');
        });

        $this->loadTranslationsFrom(__DIR__ . '/../../resources/lang', 'translations');
    }

    public function boot(): void
    {
    }
}
