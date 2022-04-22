package com.fyp.hrw.repo;

import com.fyp.hrw.model.QR;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QRRepo extends JpaRepository<QR, Long> {

    Optional<QR> findQRByQrInfo(String qrInfo);

    @Override
    void deleteAll();
}
