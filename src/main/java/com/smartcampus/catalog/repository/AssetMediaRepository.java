package com.smartcampus.catalog.repository;

import com.smartcampus.catalog.model.AssetMedia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetMediaRepository extends MongoRepository<AssetMedia, String> {

    List<AssetMedia> findByAssetIdOrderByCreatedAtAsc(String assetId);

    List<AssetMedia> findByAssetIdInOrderByCreatedAtAsc(Collection<String> assetIds);

    Optional<AssetMedia> findByIdAndAssetId(String id, String assetId);

    long countByAssetId(String assetId);

    void deleteByAssetId(String assetId);
}
