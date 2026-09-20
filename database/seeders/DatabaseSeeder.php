<?php

namespace Database\Seeders;

use App\Models\ContentCalendar;
use App\Models\Kpi;
use App\Models\Strategy;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Alex Morgan',
            'email' => 'demo@creatorplan.test',
            'email_verified_at' => now(),
        ]);

        Strategy::create([
            'user_id' => $user->id,
            'audience' => 'Early-stage creators who want a repeatable path from 0 to their first 10,000 subscribers.',
            'problem' => 'They publish inconsistently and struggle to turn good ideas into videos people click and finish.',
            'unique_angle' => 'Practical creator systems built from real experiments, not generic motivation.',
            'content_pillars' => ['Creator strategy', 'Video packaging', 'Audience growth'],
        ]);

        $videos = [
            ['title' => 'The 10K subscriber roadmap', 'topic' => 'A realistic growth plan for your first year', 'status' => 'Published'],
            ['title' => 'Fix your titles in 15 minutes', 'topic' => 'A simple packaging audit for better CTR', 'status' => 'Editing'],
            ['title' => 'How to find your first content pillar', 'topic' => 'Turn your experience into a repeatable series', 'status' => 'Filming'],
            ['title' => 'The weekly creator review', 'topic' => 'The 30-minute system that keeps you consistent', 'status' => 'Planned'],
        ];

        foreach ($videos as $index => $video) {
            ContentCalendar::create([
                'user_id' => $user->id,
                'week_number' => $index + 1,
                'upload_date' => now()->addWeeks($index)->startOfWeek(),
                ...$video,
            ]);
        }

        foreach ([
            ['month' => 1, 'subscribers' => 1240, 'avg_views' => 8400, 'watch_hours' => 410],
            ['month' => 2, 'subscribers' => 1860, 'avg_views' => 11200, 'watch_hours' => 620],
            ['month' => 3, 'subscribers' => 2740, 'avg_views' => 15800, 'watch_hours' => 890],
        ] as $kpi) {
            Kpi::create(['user_id' => $user->id, 'year' => now()->year, 'notes' => null, ...$kpi]);
        }
    }
}
