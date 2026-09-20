<?php

namespace App\Http\Controllers;

use App\Models\ContentCalendar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('calendar', [
            'videos' => $request->user()->contentCalendar()->orderBy('week_number')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data['week_number'] = $data['week_number'] ?? ((int) $request->user()->contentCalendar()->max('week_number') + 1);
        $request->user()->contentCalendar()->create($data);

        return back()->with('success', 'Video added to your calendar.');
    }

    public function update(Request $request, ContentCalendar $calendar)
    {
        abort_unless($calendar->user_id === $request->user()->id, 404);
        $calendar->update($this->validated($request, $calendar->id));

        return back()->with('success', 'Calendar updated.');
    }

    public function destroy(Request $request, ContentCalendar $calendar)
    {
        abort_unless($calendar->user_id === $request->user()->id, 404);
        $calendar->delete();

        return back()->with('success', 'Video removed from your calendar.');
    }

    private function validated(Request $request, ?int $id = null): array
    {
        return $request->validate([
            'week_number' => ['sometimes', 'integer', 'min:1', 'max:12'],
            'title' => ['required', 'string', 'max:180'],
            'topic' => ['required', 'string', 'max:180'],
            'upload_date' => ['nullable', 'date'],
            'status' => ['required', 'in:Planned,Filming,Editing,Published'],
        ]);
    }
}