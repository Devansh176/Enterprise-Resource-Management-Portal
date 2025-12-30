package prefix.repository;

import lombok.var;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import prefix.entity.Prefix;

import java.util.Date;
import java.util.List;

@Repository
public class PrefixRepository {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getCurrentSession() { return sessionFactory.getCurrentSession(); }

    public void save(Prefix prefix) { getCurrentSession().save(prefix); }

    @SuppressWarnings("unchecked")
    public List<Prefix> findAll(){ return getCurrentSession().createQuery("from Prefix").list(); }

    public void deleteById(int id) {
        Session session = getCurrentSession();
        Prefix prefix = session.get(Prefix.class, id);
        if(prefix != null) session.delete(prefix);
    }

    public void deleteAll() {
        getCurrentSession().createNativeQuery("TRUNCATE TABLE Prefix").executeUpdate();
    }

    @SuppressWarnings("unchecked")
    public List<Prefix> findWithFilters(String title, String name, Date dobFrom, Date dobTo, String gender, String prefixName) {
        StringBuilder hql = new StringBuilder("FROM Prefix WHERE 1=1 ");

        // Text Filters
        if (title != null && !title.trim().isEmpty()) hql.append("AND lower(str(title)) LIKE :title ");
        if (name != null && !name.trim().isEmpty()) hql.append("AND lower(name) LIKE :name ");
        if (gender != null && !gender.trim().isEmpty()) hql.append("AND lower(str(gender)) LIKE :gender ");
        if (prefixName != null && !prefixName.trim().isEmpty()) hql.append("AND lower(str(prefix)) LIKE :prefix ");

        // --- DATE RANGE LOGIC ---
        // If "From" is filled, get dates AFTER it
        if (dobFrom != null) {
            hql.append("AND dob >= :dobFrom ");
        }
        // If "To" is filled, get dates BEFORE it
        if (dobTo != null) {
            hql.append("AND dob <= :dobTo ");
        }
        // ------------------------

        var query = getCurrentSession().createQuery(hql.toString());

        // Set Parameters
        if (title != null && !title.trim().isEmpty()) query.setParameter("title", "%" + title.toLowerCase() + "%");
        if (name != null && !name.trim().isEmpty()) query.setParameter("name", "%" + name.toLowerCase() + "%");
        if (gender != null && !gender.trim().isEmpty()) query.setParameter("gender", "%" + gender.toLowerCase() + "%");
        if (prefixName != null && !prefixName.trim().isEmpty()) query.setParameter("prefix", "%" + prefixName.toLowerCase() + "%");

        // Bind Dates
        if (dobFrom != null) query.setParameter("dobFrom", dobFrom);
        if (dobTo != null) query.setParameter("dobTo", dobTo);

        return query.list();
    }
}