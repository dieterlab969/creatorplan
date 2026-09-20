<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KpiController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('kpis', [
            'kpis' => $request->user()->kpis()->orderByDesc('year')->orderByDesc('month')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'month' => ['required', 'integer', 'min:1', 'max:12'],
            'year' => ['required', 'integer', 'min:2020', 'max:2100'],
            'subscribers' => ['required', 'integer', 'min:0'],
            'avg_views' => ['required', 'integer', 'min:0'],
            'watch_hours' => ['required', 'integer', 'min:0'],
            'notes' => ['nullable', 'string', 'max:5000'],
        ]);

        $request->user()->kpis()->updateOrCreate(
            ['month' => $data['month'], 'year' => $data['year']],
            $data
        );

        return back()->with('success', 'Monthly KPI saved.');
    }
}