package com.fyp.hrw.repo;

import com.fyp.hrw.model.QR;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QRRepo extends JpaRepository<QR, Long> {
    QR findQRByQrInfo(String qrInfo);
}
