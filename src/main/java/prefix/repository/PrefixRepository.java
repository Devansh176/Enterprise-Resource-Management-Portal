package prefix.repository;

import lombok.var;
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


    // Search Title Query
    @SuppressWarnings("unchecked")
    public List<Prefix> findWithFilters(String title, String gender, String prefixName) {
        StringBuilder hql = new StringBuilder("FROM Prefix WHERE 1=1 ");

        if (title != null && !title.trim().isEmpty()) {
            hql.append("AND lower(str(title)) LIKE :title ");
        }
        if (gender != null && !gender.trim().isEmpty()) {
            hql.append("AND lower(str(gender)) LIKE :gender ");
        }
        if (prefixName != null && !prefixName.trim().isEmpty()) {
            hql.append("AND lower(str(prefix)) LIKE :prefix ");
        }

        var query = getCurrentSession().createQuery(hql.toString());

        if (title != null && !title.trim().isEmpty()) {
            query.setParameter("title", "%" + title.toLowerCase() + "%");
        }
        if (gender != null && !gender.trim().isEmpty()) {
            query.setParameter("gender", "%" + gender.toLowerCase() + "%");
        }
        if (prefixName != null && !prefixName.trim().isEmpty()) {
            query.setParameter("prefix", "%" + prefixName.toLowerCase() + "%");
        }

        return query.list();
    }

}
