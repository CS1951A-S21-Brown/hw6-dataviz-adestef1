import pandas as pd

#This is me making the genre_count csv file by seperating the listed_in file by comma

df = pd.read_csv('netflix_titles.csv')
# new_df = pd.DataFrame(df.listed_in.str.split(',').tolist(), index=df.title).stack()
# new_df = new_df.reset_index([0, 'title'])
# new_df.columns = ['title', 'genre']
# new_df.to_csv('genre_count.csv')

#Since I'm new to pandas, I found it easier to then use the following SQL statement to get the counts
'''
SELECT
	genre, count(genre)
FROM
	genre_count
GROUP BY genre
'''

#removing the min from movies and TV show
# other_df = df[df.type != "TV Show"]
# other_df['duration'] = other_df['duration'].str.extract('(\d+)', expand=False)
# other_df['duration'] = other_df['duration'].astype(int)
# other_df.to_csv('movie_duration.csv')

#Since I'm new to pandas, I found it easier to then use the following SQL statement to get the average duration and count of rated r
'''
with R as (
SELECT 
	release_year, count(rating) as "R_count"
FROM
	movie_duration
WHERE release_year > 1970 and rating = "R"
GROUP BY release_year
)
SELECT 
	movie_duration.release_year, round(avg(movie_duration.duration),2) as "average_runtime", CASE when R_count IS NULL then 0 ELSE R_count END as "R_count"
FROM
	movie_duration
LEFT JOIN R ON movie_duration.release_year = R.release_year
WHERE movie_duration.release_year > 1970
GROUP BY movie_duration.release_year
'''



