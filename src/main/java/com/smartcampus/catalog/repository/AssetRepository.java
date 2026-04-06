package com.smartcampus.catalog.repository;

import com.smartcampus.catalog.model.Asset;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends MongoRepository<Asset, String> {

    boolean existsByAssetCodeIgnoreCase(String assetCode);

    boolean existsByAssetCodeIgnoreCaseAndIdNot(String assetCode, String id);

    long countByAssetTypeId(String assetTypeId);

    long countByLocationId(String locationId);
}
