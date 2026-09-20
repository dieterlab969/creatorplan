<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kpi extends Model
{
    protected $fillable = ['month', 'year', 'subscribers', 'avg_views', 'watch_hours', 'notes'];

    protected function casts(): array
    {
        return [
            'month' => 'integer',
            'year' => 'integer',
            'subscribers' => 'integer',
            'avg_views' => 'integer',
            'watch_hours' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}