<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StrategyController extends Controller
{
    public function show(Request $request)
    {
        return Inertia::render('strategy', ['strategy' => $request->user()->strategy]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'audience' => ['required', 'string', 'max:5000'],
            'problem' => ['required', 'string', 'max:5000'],
            'unique_angle' => ['required', 'string', 'max:5000'],
            'content_pillars' => ['required', 'array', 'min:3', 'max:5'],
            'content_pillars.*' => ['required', 'string', 'max:120'],
        ]);

        $request->user()->strategy()->updateOrCreate([], $data);

        return back()->with('success', 'Your strategy has been saved.');
    }
}