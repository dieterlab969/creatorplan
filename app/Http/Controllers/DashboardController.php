<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $kpis = $user->kpis()->orderBy('year')->orderBy('month')->get();

        return Inertia::render('dashboard', [
            'strategy' => $user->strategy,
            'latestKpi' => $kpis->last(),
            'kpis' => $kpis,
            'upcomingVideos' => $user->contentCalendar()
                ->orderBy('week_number')
                ->limit(4)
                ->get(),
        ]);
    }
}