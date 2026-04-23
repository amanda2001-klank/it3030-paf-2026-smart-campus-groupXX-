package com.smartcampus.ticketing.repository;

import com.smartcampus.ticketing.model.Incident;
import com.smartcampus.ticketing.model.IncidentStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentRepository extends MongoRepository<Incident, String> {
    Optional<Incident> findByTicketNumber(String ticketNumber);
    List<Incident> findByStatus(IncidentStatus status);
    List<Incident> findByReportedById(String reportedById);
    List<Incident> findByAssignedTechnicianId(String assignedTechnicianId);
}
