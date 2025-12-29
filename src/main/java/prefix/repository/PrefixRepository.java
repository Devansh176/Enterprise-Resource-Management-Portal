package prefix.repository;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import prefix.entity.Prefix;

import java.util.List;

@Repository
public class PrefixRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() {
        return sessionFactory.getCurrentSession();
    }

    public void save(Prefix prefix) {
        getCurrentSession().save(prefix);
    }

    @SuppressWarnings("unchecked")
    public List<Prefix> findAll(){
        return getCurrentSession().createQuery("from Prefix").list();
    }

    public void deleteById(int id) {
        Session session = getCurrentSession();
        Prefix prefix = session.get(Prefix.class, id);
        if(prefix != null) {
            session.delete(prefix);
        }
    }

    public void deleteAll() {
        getCurrentSession().createNativeQuery("TRUNCATE TABLE Prefix").executeUpdate();
    }


    // Search Query
    @SuppressWarnings("unchecked")
    public List<Prefix> findByTitle(String query) {
        if(query == null || query.trim().isEmpty()) {
            return findAll();
        }

        String hql = "FROM Prefix WHERE lower(str(title)) LIKE :searchKey";

        return getCurrentSession().createQuery(hql)
                .setParameter("searchKey", "%" + query.toLowerCase() + "%")
                .list();
    }
}
