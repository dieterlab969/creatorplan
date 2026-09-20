<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('content_calendar', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('week_number');
            $table->string('title');
            $table->string('topic');
            $table->date('upload_date')->nullable();
            $table->string('status')->default('Planned');
            $table->timestamps();
            $table->index(['user_id', 'week_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('content_calendar');
    }
};