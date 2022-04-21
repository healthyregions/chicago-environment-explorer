setwd("~/Code/chicago-environment-explorer/public/geojson")

library(sf)
library(tmap)

chi <- st_read("tree_sst_master_tracts.geojson")

head(chi)

health <- read.csv("HealthAtlas.csv")
head(health)
health$commarea_n <- health$GEOID


comarea <- st_read("community_areas.geojson")
head(comarea)
comarea$commarea_n <- comarea$area_numbe
comarea <- merge(comarea, health, by="commarea_n")
tm_shape(comarea) + tm_fill("AdAsthRt", style = "sd")


test <- merge(chi,health, by.x ="commarea_n", by.y="GEOID")
head(test)
head(chi)

plot(test)
tm_shape(test) + tm_fill("AdAsthRt", style = "quantile")
tm_shape(test) + tm_fill("PhysRate", style = "quantile")
tm_shape(test) + tm_fill("LngCncRt", style = "quantile")
tm_shape(test) + tm_fill("CancerRt", style = "quantile")
tm_shape(test) + tm_fill("HypRt", style = "quantile")

final <- merge(chi,health, by ="commarea_n")

st_write(final,"tree_sst_master_tracts2.geojson")
final2 <- st_drop_geometry(final)
write.csv(final2,"tree_sst_master_tracts2.csv")

dim(test)
