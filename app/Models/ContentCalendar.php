<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentCalendar extends Model
{
    protected $table = 'content_calendar';

    protected $fillable = ['week_number', 'title', 'topic', 'upload_date', 'status'];

    protected function casts(): array
    {
        return ['upload_date' => 'date'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}