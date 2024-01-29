package database;

import org.bson.Document;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.Arrays;

public class AccessDatabase {
	
	String returnString;
    
	public String databaseAccess() {
	    try (MongoClient mongoClient = new MongoClient(new MongoClientURI("mongodb://osubeatmaps:mmDnVK4YgAJncsONPD9z@db.dynam1c.net:27017/osu_beatmaps"))) {
	        MongoDatabase database = mongoClient.getDatabase("osu_beatmaps");
	        MongoCollection<Document> collection = database.getCollection("uncompressed");

	        Document query = new Document("mode", "osu")
	                .append("ranked", 1);

	        Document randomQuery = new Document("$sample", new Document("size", 1));

	        Document result = collection.aggregate(Arrays.asList(
	                new Document("$match", query),
	                randomQuery
	        )).first();
	        
	            String jsonString = result.toJson();
	            returnString = jsonString;

	            
	            
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    
	    return returnString;
	}
}
