<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Strategy extends Model
{
    protected $fillable = ['audience', 'problem', 'unique_angle', 'content_pillars'];

    protected function casts(): array
    {
        return ['content_pillars' => 'array'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}