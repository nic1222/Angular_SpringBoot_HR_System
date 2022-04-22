package com.fyp.hrw.service;

import com.fyp.hrw.exception.RecordNotFoundException;
import com.fyp.hrw.model.EmployeeLeave;
import com.fyp.hrw.model.Event;
import com.fyp.hrw.repo.EventRepo;
import com.fyp.hrw.repo.LeaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EventService {
    private final EventRepo eventRepo;

    private final LeaveRepo leaveRepo;

    @Autowired
    public EventService(EventRepo eventRepo, LeaveRepo leaveRepo) {
        this.eventRepo = eventRepo;
        this.leaveRepo = leaveRepo;
    }

    public Event addEvent(Event event) {
        return eventRepo.save(event);
    }

    public List<Event> findAllEvent() {
        return eventRepo.findAll();
    }

    public Event findEventById(Long id) {
        return eventRepo.findById(id).orElseThrow(() -> new RecordNotFoundException("Event Not Found"));
    }

    public Event updateEvent(Event event) {
        return eventRepo.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepo.deleteEventById(id);
    }

    public List<Event> retrieveEventsByDate(String dateFrom, String dateTo) throws ParseException {

        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = format.parse(dateFrom);
        Date date2 = format.parse(dateTo);
        List<Event> eventList = eventRepo.findEventByDate(date1, date2);

        List<EmployeeLeave> leaveList = leaveRepo.findLeaveByDate(date1, date2);
        leaveList.forEach(l -> {
            Event e = new Event();
            e.setTitle(l.getEmployee().getName() + " " + l.getType());
            e.setStartDate(l.getDateFrom());
            e.setEndDate(l.getDateTo());
            eventList.add(e);
        });
        return eventList;
    }
}
