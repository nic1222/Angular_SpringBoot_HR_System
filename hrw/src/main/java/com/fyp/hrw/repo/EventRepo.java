package com.fyp.hrw.repo;

import com.fyp.hrw.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface EventRepo extends JpaRepository<Event, Long> {
    void deleteEventById(Long id);

    List<Event> findEventByDate(Date date1, Date date2);
}
