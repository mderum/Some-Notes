
_
 jdbcTemplate.queryForObject(
 //select query 
 QueryConstant.GET_VLE_PROFILE_DETAILED_QUERY,
//object with param for  return is of type given 
 new Object[] { vleId },
//object or dto for mapping   <T> and t.class 
 new BeanPropertyRowMapper<UserDTO>(UserDTO.class));

_
map all returned to list 
jdbcTemplate.query(QueryConstant.GET_ALL_STATE_DTLS,  
					new BeanPropertyRowMapper<StateDTO>(StateDTO.class));

_
object with param if there ant 
jdbcTemplate.query(QueryConstant.GET_ALL_CITY_BY_STATE, new Object[] { state }, new BeanPropertyRowMapper<StateDTO>(StateDTO.class));	




_

writing file byte of a file 
System.getProperty("user.dir")  vm folder path+ folder +  filename 
		OutputStream os = new FileOutputStream(System.getProperty("user.dir") + AppConstant.CANCEL_PATH + fileName);
os.write(fileByte);
		os.close();


- 		

open file in reader 
CSVReader csvReader = new CSVReader(new FileReader(System.getProperty("user.dir") + AppConstant.CANCEL_PATH + fileName));
CsvToBean<T> parse with strategy and file which is read



compare and sort by name 		serviceDTOList.sort((o1, o2) -> o1.getService_name().compareTo(o2.getService_name()) );
