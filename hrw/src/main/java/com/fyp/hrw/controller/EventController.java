package com.fyp.hrw.controller;

import com.fyp.hrw.model.Event;
import com.fyp.hrw.service.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvent() {
        List<Event> eventList = eventService.findAllEvent();
        return new ResponseEntity<>(eventList, HttpStatus.OK);
    }

    @GetMapping("find/{id}")
    public ResponseEntity<Event> getAllEvent(@PathVariable("id") Long id) {
        Event event = eventService.findEventById(id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        Event event1 = eventService.addEvent(event);
        return new ResponseEntity<>(event1, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Event updateEvent = eventService.updateEvent(event);
        return new ResponseEntity<>(updateEvent, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Event> deleteEvent(@PathVariable("id") Long id) {
        eventService.deleteEvent(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/find/event/dates")
    public ResponseEntity<?> retrieveEventsByDate(@RequestParam("date1") String date1,
                                                  @RequestParam("date2") String date2) throws ParseException {
        List<Event> eventList = eventService.retrieveEventsByDate(date1, date2);
        return new ResponseEntity<>(eventList, HttpStatus.OK);
    }
}
